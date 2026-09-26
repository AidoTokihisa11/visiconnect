// Build-time static prerender of the public routes.
// Runs automatically as part of `npm run build` (see package.json).
//
// Serves the freshly built `build/` from an in-process static server, visits
// each public route with Puppeteer and writes the fully-rendered HTML to
// build/<route>/index.html so crawlers get real content without executing JS.
// The React bundle still boots on top of it (CSR takes over after load).
//
// Flags / env:
//   --strict          exit(1) if any route fails  (also PRERENDER_STRICT=1)
//   SKIP_PRERENDER=1  skip entirely, leave the CSR build untouched

import { createServer } from 'node:http';
import { createReadStream, statSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, extname, normalize, join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { prerenderRoutes } from './public-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLIENT_DIR = resolve(__dirname, '..');
const BUILD_DIR = resolve(CLIENT_DIR, 'build');
const PORT = Number(process.env.PRERENDER_PORT || 4173);
const BASE = `http://127.0.0.1:${PORT}`;
const STRICT = process.argv.includes('--strict') || process.env.PRERENDER_STRICT === '1';
const NAV_TIMEOUT = 45000;
const RENDER_TIMEOUT = 20000;
const SETTLE_MS = 600;

// The app renders this screen when VITE_CONVEX_URL / VITE_CLERK_PUBLISHABLE_KEY
// are missing — never bake that into a crawlable page.
const CONFIG_ERROR_MARKER = 'Configuration requise';

// Clerk/Convex cannot authenticate from here: the preview server is localhost
// while production keys are domain-locked. That only breaks the signed-in UI,
// which crawlers never see — so validate the produced markup, not the console.
const MIN_TEXT_LENGTH = 400;

const log = (msg) => console.log(`[prerender] ${msg}`);

function bail(reason) {
  if (STRICT) {
    console.error(`[prerender] ${reason}`);
    process.exit(1);
  }
  console.warn(`[prerender] ${reason} — skipped (CSR build kept as-is)`);
  process.exit(0);
}

if (process.env.SKIP_PRERENDER === '1') bail('SKIP_PRERENDER=1');
if (!existsSync(BUILD_DIR)) bail('build/ not found — run `vite build` first');

let puppeteer;
try {
  puppeteer = (await import('puppeteer')).default;
} catch {
  bail('puppeteer is not installed (npm i -D puppeteer)');
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

// `vite preview` was spawned through npx here and silently failed to come up in
// the deploy container. Serving in-process removes the shell, the PATH lookup
// and the stdout parsing that made readiness detection unreliable.
function startStaticServer() {
  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, BASE).pathname);
    const candidate = normalize(join(BUILD_DIR, urlPath));

    // Defense in depth: a crafted path must not escape the build directory.
    let filePath = candidate.startsWith(BUILD_DIR) ? candidate : BUILD_DIR;
    try {
      if (statSync(filePath).isDirectory()) filePath = join(filePath, 'index.html');
    } catch {
      filePath = join(BUILD_DIR, 'index.html'); // SPA fallback
    }
    if (!existsSync(filePath)) filePath = join(BUILD_DIR, 'index.html');

    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
    createReadStream(filePath).pipe(res);
  });

  const ready = new Promise((res, rej) => {
    server.once('error', rej);
    server.listen(PORT, '127.0.0.1', res);
  });

  return { server, ready };
}

function stamp(html) {
  const marker = `<meta name="x-prerendered" content="${new Date().toISOString()}">`;
  return html.includes('</head>') ? html.replace('</head>', `  ${marker}\n</head>`) : html;
}

const { server, ready } = startStaticServer();
const failed = [];
let rendered = 0;
let browser;

try {
  await ready;
  browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });

  // Only the preview server may answer. Clerk/Convex/Stripe/analytics are
  // unreachable from a build container anyway (production keys are domain-locked),
  // and letting them hang would stall every route.
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    if (url.startsWith(BASE) || url.startsWith('data:') || url.startsWith('blob:')) {
      req.continue();
    } else {
      req.abort();
    }
  });

  for (const route of prerenderRoutes) {
    try {
      await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded', timeout: NAV_TIMEOUT });
      // Convex/Clerk keep WebSockets open, so the network never goes idle:
      // wait for the React tree to be painted instead of `networkidle0`.
      await page.waitForFunction(
        () => {
          const root = document.getElementById('root');
          return root && root.childElementCount > 0 && root.innerText.trim().length > 0;
        },
        { timeout: RENDER_TIMEOUT }
      );
      await sleep(SETTLE_MS);

      const html = await page.content();
      if (html.includes(CONFIG_ERROR_MARKER)) {
        throw new Error('rendered the "Configuration requise" screen (missing VITE_* env vars)');
      }

      const { textLength, title } = await page.evaluate(() => ({
        textLength: document.getElementById('root')?.innerText.trim().length ?? 0,
        title: document.title.trim(),
      }));
      if (textLength < MIN_TEXT_LENGTH) {
        throw new Error(`only ${textLength} chars rendered (< ${MIN_TEXT_LENGTH})`);
      }
      if (!title) throw new Error('empty <title> — SEO metadata did not render');

      const outDir = route === '/' ? BUILD_DIR : resolve(BUILD_DIR, route.replace(/^\//, ''));
      mkdirSync(outDir, { recursive: true });
      writeFileSync(resolve(outDir, 'index.html'), stamp(html), 'utf8');
      rendered += 1;
      log(`${route}  ✓`);
    } catch (err) {
      failed.push(route);
      console.warn(`[prerender] ${route}  ✗ ${err.message}`);
    }
  }
} catch (err) {
  console.error(`[prerender] aborted: ${err.message}`);
  if (STRICT) process.exitCode = 1;
} finally {
  await browser?.close();
  server.close();
}

log(`done — ${rendered}/${prerenderRoutes.length} routes rendered`);

if (failed.length) {
  console.warn(`[prerender] failed routes: ${failed.join(', ')}`);
  if (STRICT) process.exitCode = 1;
}

// Nothing written means the step is broken, not flaky: shipping a silently
// CSR-only build would defeat the whole point of running it.
if (rendered === 0) {
  console.error('[prerender] no route was rendered — the build is CSR-only');
  process.exitCode = 1;
}
