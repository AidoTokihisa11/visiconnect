import { test, expect } from '@playwright/test';

// E2E scope: validate the SEO / RGPD artifacts shipped as static assets
// (index.html + robots.txt + sitemap.xml). These do NOT depend on Clerk /
// Convex env vars being present, so the tests stay reliable in CI and in
// local previews without secrets.
test.describe('Public SEO artifacts', () => {
  test('index.html ships structured data and the SEO baseline', async ({ page, request }) => {
    const res = await request.get('/');
    expect(res.status()).toBe(200);
    const html = await res.text();

    expect(html).toMatch(/<meta[^>]+name=["']description["']/i);
    expect(html).toMatch(/<link[^>]+rel=["']canonical["']/i);
    expect(html).toMatch(/<meta[^>]+property=["']og:title["']/i);

    expect(html).toMatch(/<script[^>]+type=["']application\/ld\+json["']/i);
    expect(html).toContain('"@type": "Organization"');
    expect(html).toContain('"@type": "WebSite"');
    expect(html).toContain('VisioConnect');

    // Live page must render an <h1> (real content when env is set, or the
    // "Configuration requise" fallback — both are acceptable here).
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 15_000 });
  });

  test('robots.txt is served and excludes private routes', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();

    expect(body).toMatch(/Sitemap:/i);
    expect(body).toMatch(/Disallow:\s*\/admin/i);
    expect(body).toMatch(/Disallow:\s*\/dashboard/i);
    expect(body).toMatch(/Disallow:\s*\/api/i);
  });

  test('sitemap.xml is served and lists URLs', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const body = await res.text();

    expect(body).toContain('<urlset');
    expect(body).toMatch(/<loc>https?:\/\/[^<]+<\/loc>/i);
  });
});
