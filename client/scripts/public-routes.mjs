// Single source of truth for public routes.
// Consumed by generate-sitemap.mjs (sitemap.xml) and prerender.mjs (static HTML).
// `prerender: false` => listed in the sitemap but not pre-rendered (auth screens).

export const publicRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/features', changefreq: 'monthly', priority: '0.9' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/security', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/docs', changefreq: 'weekly', priority: '0.7' },
  { path: '/developer', changefreq: 'monthly', priority: '0.6' },
  { path: '/integrations', changefreq: 'monthly', priority: '0.6' },
  { path: '/partners', changefreq: 'monthly', priority: '0.5' },
  { path: '/careers', changefreq: 'monthly', priority: '0.5' },
  { path: '/community', changefreq: 'monthly', priority: '0.5' },
  { path: '/status', changefreq: 'daily', priority: '0.4' },
  { path: '/changelog', changefreq: 'weekly', priority: '0.5' },
  { path: '/user-guide', changefreq: 'monthly', priority: '0.6' },
  { path: '/support', changefreq: 'monthly', priority: '0.5' },
  { path: '/demo', changefreq: 'monthly', priority: '0.7' },
  { path: '/login', changefreq: 'yearly', priority: '0.3', prerender: false },
  { path: '/signup', changefreq: 'yearly', priority: '0.4', prerender: false },
  { path: '/legal', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/cookies', changefreq: 'yearly', priority: '0.3' },
];

export const prerenderRoutes = publicRoutes
  .filter((r) => r.prerender !== false)
  .map((r) => r.path);
