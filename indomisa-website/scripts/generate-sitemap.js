const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { Readable } = require('stream');
const path = require('path');

const routes = require('./routes.config');

const SITE_URL = 'https://indomisa.co.za';

async function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const links = routes
    .filter((route) => route.enabled)
    .map((route) => ({
      url: route.url,
      changefreq: route.changefreq,
      priority: route.priority,
      lastmod: today,
    }));

  const sitemapPath = path.join(__dirname, '../src/sitemap.xml');
  const sitemapStream = new SitemapStream({ hostname: SITE_URL });
  const writeStream = createWriteStream(sitemapPath);

  Readable.from(links).pipe(sitemapStream).pipe(writeStream);

  await streamToPromise(sitemapStream);

  console.log(`✅ Sitemap generated with ${links.length} routes`);
  console.log(`📍 Output: ${sitemapPath}`);
}

generateSitemap().catch((error) => {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
});