import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://zerixsecurities.com',
  integrations: [sitemap()],
  compressHTML: true,
});
