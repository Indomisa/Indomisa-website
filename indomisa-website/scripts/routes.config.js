const ROUTES_CONFIG = [
  { url: '/', changefreq: 'weekly', priority: 1.0, enabled: true },
  { url: '/about', changefreq: 'monthly', priority: 0.9, enabled: true },
  { url: '/services', changefreq: 'weekly', priority: 0.95, enabled: true },
  { url: '/services/software-development', changefreq: 'monthly', priority: 0.9, enabled: true },
  { url: '/services/business-analysis', changefreq: 'monthly', priority: 0.9, enabled: true },
  { url: '/services/web-development', changefreq: 'monthly', priority: 0.9, enabled: true },
  { url: '/contact', changefreq: 'monthly', priority: 0.8, enabled: true },

  // Enable only once these pages exist on the website.
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3, enabled: false },
  { url: '/terms-and-conditions', changefreq: 'yearly', priority: 0.3, enabled: false },
  { url: '/cookies', changefreq: 'yearly', priority: 0.3, enabled: false },
  { url: '/case-studies', changefreq: 'monthly', priority: 0.7, enabled: false },
  { url: '/blog', changefreq: 'weekly', priority: 0.75, enabled: false },
];

module.exports = ROUTES_CONFIG;