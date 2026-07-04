const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { Readable } = require('stream');
const path = require('path');

const SITE_URL = 'https://indomisa.co.za';

const routes = routesConfig.routes; 

async function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const links = routes.map(route => ({
    url: route.url,
    changefreq: route.changefreq,
    priority: route.priority,
    lastmod: today,
  }));

  const sitemapStream = new SitemapStream({ hostname: SITE_URL });

  const sitemapPath = path.join(__dirname, '../src/sitemap.xml');
  const writeStream = createWriteStream(sitemapPath);

  Readable.from(links).pipe(sitemapStream).pipe(writeStream);

  await streamToPromise(sitemapStream);

  console.log(`Sitemap generated at: ${sitemapPath}`);
}

generateSitemap().catch(error => {
  console.error('Error generating sitemap:', error);
  process.exit(1);
});