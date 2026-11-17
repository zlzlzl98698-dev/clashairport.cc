const fs = require('fs');
const path = require('path');

function walk(dir) {
  let entries = [];
  if (!fs.existsSync(dir)) return entries;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name === '_astro' || item.name === 'pagefind') continue;
      entries.push(...walk(full));
    } else if (item.name === 'index.html') {
      entries.push(full);
    }
  }
  return entries;
}

const distDir = path.resolve('dist');
const indexFiles = walk(distDir);
let aliasCount = 0;
const canonicalUrls = [];

indexFiles.forEach(indexPath => {
  const dir = path.dirname(indexPath);
  if (dir === distDir) {
    canonicalUrls.push('https://clashairport.cc/');
    return;
  }

  const relDir = path.relative(distDir, dir).replace(/\\/g, '/');
  const targetUrl = '/' + relDir + '/';
  canonicalUrls.push('https://clashairport.cc' + targetUrl);
  const aliasPath = dir + '.html';

  // Only create alias if it doesn't already exist as a file or folder
  if (!fs.existsSync(aliasPath)) {
    const redirectHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>正在跳转...</title>
  <meta http-equiv="refresh" content="0; url=${targetUrl}">
  <link rel="canonical" href="https://clashairport.cc${targetUrl}">
</head>
<body>
  <p>正在前往 <a href="${targetUrl}">${targetUrl}</a> ...</p>
  <script>window.location.replace('${targetUrl}');</script>
</body>
</html>`;

    fs.writeFileSync(aliasPath, redirectHtml, 'utf-8');
    aliasCount++;
  }
});

console.log(`Generated ${aliasCount} .html redirect aliases in dist/`);

// Sort URLs deterministically
canonicalUrls.sort();

// Generate native sitemap-0.xml
const now = new Date().toISOString();
const urlElements = canonicalUrls.map(url => {
  const priority = url === 'https://clashairport.cc/' ? '1.0' : '0.8';
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n');

const sitemap0Content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;

const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
fs.writeFileSync(sitemap0Path, sitemap0Content, 'utf-8');
console.log(`Generated ${sitemap0Path} with ${canonicalUrls.length} URLs`);

// Generate sitemap-index.xml
const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://clashairport.cc/sitemap-0.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;

const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
fs.writeFileSync(sitemapIndexPath, sitemapIndexContent, 'utf-8');
console.log(`Generated ${sitemapIndexPath}`);

// Generate sitemap.xml as identical to sitemap-index.xml for full compatibility
const sitemapPath = path.join(distDir, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapIndexContent, 'utf-8');
console.log(`Generated ${sitemapPath}`);
