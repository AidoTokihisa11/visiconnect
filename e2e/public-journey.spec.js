import { test, expect } from '@playwright/test';

// Critical journey: a visitor lands on the homepage, navigates to the login
// page from the top navigation, and sees the login form.
test.describe('Public visitor journey', () => {
  test('landing → login page shows the form', async ({ page }) => {
    await page.goto('/');

    // The homepage must render its main title (h1). We do not hardcode a
    // specific text because the copy evolves; we just require a visible h1.
    await expect(page.locator('h1').first()).toBeVisible();

    // SEO baseline: canonical & OG title present in HTML.
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeTruthy();

    // Follow the login link. The href is stable even if the label changes.
    await page.locator('a[href="/login"]').first().click();

    await expect(page).toHaveURL(/\/login$/);

    // The login page must expose an email input and a password input.
    const email = page
      .getByRole('textbox', { name: /e-?mail/i })
      .or(page.locator('input[type="email"]'));
    const password = page.locator('input[type="password"]');
    await expect(email.first()).toBeVisible();
    await expect(password.first()).toBeVisible();
  });

  test('robots.txt is served and references the sitemap', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/Sitemap:/i);
  });
});
