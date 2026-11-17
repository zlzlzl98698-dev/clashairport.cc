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

indexFiles.forEach(indexPath => {
  const dir = path.dirname(indexPath);
  if (dir === distDir) return; // Skip root index.html

  const relDir = path.relative(distDir, dir).replace(/\\/g, '/');
  const targetUrl = '/' + relDir + '/';
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

// Ensure physical dist/sitemap.xml is available for search engine tools
const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
const sitemapPath = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(sitemapIndexPath)) {
  fs.copyFileSync(sitemapIndexPath, sitemapPath);
  console.log('Created physical dist/sitemap.xml from sitemap-index.xml');
}
