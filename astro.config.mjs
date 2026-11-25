import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://zerixsecurities.com',
  integrations: [sitemap({ filter: (page) => !/\/(why-cyber|white-papers)\/?$/.test(page) })],
  compressHTML: true,
});
