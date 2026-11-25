import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://zerixsecurities.com',
  integrations: [sitemap({ filter: (page) => !/\/(why-cyber|white-papers|company\/team)\/?$/.test(page) })],
  compressHTML: true,
});
