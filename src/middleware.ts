import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  // If the path ends with .html (and isn't 404.html), redirect 301 to the canonical directory URL
  if (url.pathname.endsWith('.html') && url.pathname !== '/404.html') {
    const cleanPath = url.pathname.replace(/\.html$/, '/');
    return context.redirect(cleanPath, 301);
  }
  return next();
});
