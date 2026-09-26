// Generates client/public/sitemap.xml from the public route list.
// Run automatically before `vite build` (see package.json script).

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { publicRoutes as routes } from './public-routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.visioconnect.pro').replace(/\/$/, '');

const lastmod = new Date().toISOString().slice(0, 10);
const urls = routes
  .map(
    (r) =>
      `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const publicDir = resolve(__dirname, '..', 'public');
mkdirSync(publicDir, { recursive: true });
writeFileSync(resolve(publicDir, 'sitemap.xml'), xml, 'utf8');
console.log(`[sitemap] Generated ${routes.length} URLs → public/sitemap.xml`);
