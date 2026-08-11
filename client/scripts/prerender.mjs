// OPT-IN static prerender for public routes. Not part of Vercel build.
// Usage locally: npm run build && npm run prerender
// Requires: npm i -D puppeteer   (300 MB, installs Chromium)
//
// Spins up `vite preview`, visits each public route with Puppeteer, writes
// the fully-rendered HTML into client/build/<route>/index.html so crawlers
// see real content without executing JS.

import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = resolve(__dirname, '..', 'build');
const PORT = 4173;
const BASE = `http://localhost:${PORT}`;

// Public routes to prerender (must match the sitemap).
const ROUTES = [
  '/',
  '/features',
  '/pricing',
  '/about',
  '/security',
  '/contact',
  '/blog',
  '/docs',
  '/developer',
  '/integrations',
  '/partners',
  '/careers',
  '/community',
  '/status',
  '/changelog',
  '/user-guide',
  '/support',
  '/demo',
  '/legal',
  '/privacy',
  '/terms',
  '/cookies',
];

if (!existsSync(BUILD_DIR)) {
  console.error('[prerender] build/ not found — run `npm run build` first.');
  process.exit(1);
}

let puppeteer;
try {
  puppeteer = (await import('puppeteer')).default;
} catch {
  console.error('[prerender] puppeteer not installed. Run: npm i -D puppeteer');
  process.exit(1);
}

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  cwd: resolve(__dirname, '..'),
  stdio: ['ignore', 'pipe', 'inherit'],
  shell: true,
});

await new Promise((res) => {
  server.stdout.on('data', (d) => {
    if (String(d).includes(`localhost:${PORT}`)) res();
  });
});

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();

for (const route of ROUTES) {
  const url = `${BASE}${route}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    const html = await page.content();
    const outDir = route === '/' ? BUILD_DIR : resolve(BUILD_DIR, route.replace(/^\//, ''));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, 'index.html'), html, 'utf8');
    console.log(`[prerender] ${route}  ✓`);
  } catch (err) {
    console.warn(`[prerender] ${route}  ✗ ${err.message}`);
  }
}

await browser.close();
server.kill();
console.log('[prerender] done');
