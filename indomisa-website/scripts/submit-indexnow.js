// SEO: submits every enabled route to IndexNow so Bing/Yandex re-crawl
// changed pages within minutes instead of waiting for their normal
// crawl schedule. Reuses the same route list as generate-sitemap.js so
// there is exactly one place that defines "what pages exist" — no
// separate hand-maintained URL list that can drift out of sync.
//
// Usage:
//   node scripts/submit-indexnow.js            # submit all enabled routes
//   node scripts/submit-indexnow.js /contact    # submit just one path
//
// Run this after publishing new/changed content — wire it into your
// deploy step (e.g. a postdeploy npm script or CI job) rather than
// running it on every single build, since IndexNow is meant for actual
// content changes, not routine rebuilds.

const https = require('https');
const ROUTES_CONFIG = require('./routes.config');

const HOST = 'indomisa.it.com';
const SITE_URL = `https://${HOST}`;
const INDEXNOW_KEY = '7e9ecb6822ad447491bbbc7b34bf631d';
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

function buildUrlList() {
  const argPath = process.argv[2];
  if (argPath) {
    return [`${SITE_URL}${argPath}`];
  }
  return ROUTES_CONFIG.filter((r) => r.enabled).map((r) => `${SITE_URL}${r.url}`);
}

function submit(urlList) {
  const payload = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  });

  const req = https.request(
    {
      hostname: 'api.indexnow.org',
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
      },
    },
    (res) => {
      console.log(`IndexNow responded ${res.statusCode} for ${urlList.length} URL(s):`);
      urlList.forEach((u) => console.log('  -', u));
      // 200/202 = accepted. 400/403/422 usually means the key file
      // isn't reachable yet at KEY_LOCATION, or host mismatch.
    }
  );

  req.on('error', (err) => console.error('IndexNow submission failed:', err.message));
  req.write(payload);
  req.end();
}

submit(buildUrlList());
