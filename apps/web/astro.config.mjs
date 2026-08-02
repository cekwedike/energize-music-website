import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: process.env.PUBLIC_SITE_URL ?? 'https://energize-music.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
