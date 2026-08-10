import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL ?? 'https://energize-music.com',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        const url = item.url;
        if (url.endsWith('/') || url.endsWith('energize-music.com')) {
          return { ...item, changefreq: 'daily', priority: 1 };
        }
        if (
          url.includes('/artists/') ||
          url.includes('/releases/') ||
          url.includes('/events/') ||
          url.includes('/blogs/')
        ) {
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
