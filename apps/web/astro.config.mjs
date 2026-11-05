import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Every real page with a one-part URL. Any other one-part URL is an event short link, which redirects
// and so stays out of the sitemap. Add new top-level pages here.
const TOP_LEVEL_PAGES = new Set([
  'about',
  'artists',
  'blog',
  'contact',
  'energize-kids',
  'events',
  'next',
  'privacy',
  'releases',
  'terms',
]);

function isSitemapPage(page) {
  const { pathname } = new URL(page);
  if (pathname.includes('/404') || pathname.startsWith('/events/energize-fest')) return false;
  const parts = pathname.split('/').filter(Boolean);
  return parts.length !== 1 || TOP_LEVEL_PAGES.has(parts[0]);
}

export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL ?? 'https://www.energize-music.com',
  integrations: [
    react(),
    sitemap({
      filter: isSitemapPage,
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        const url = item.url;
        if (url.endsWith('/') || url.endsWith('energize-music.com')) {
          return { ...item, changefreq: 'daily', priority: 1 };
        }
        if (url.includes('/artists/') || url.includes('/releases/') || url.includes('/events/') || url.includes('/blog')) {
          return { ...item, changefreq: 'weekly', priority: 0.8 };
        }
        if (url.includes('/privacy') || url.includes('/terms')) {
          return { ...item, changefreq: 'yearly', priority: 0.3 };
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) return 'gsap';
            if (id.includes('node_modules/react-dom')) return 'react';
            if (id.includes('node_modules/react/')) return 'react';
          },
        },
      },
    },
  },
});
