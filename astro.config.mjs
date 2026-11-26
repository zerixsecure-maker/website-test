import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://zerixsecurities.com',
  integrations: [sitemap({ filter: (page) => !/\/(why-cyber|white-papers|company\/team)\/?$/.test(page) && !/\/services\/(secure-networking|network-redesign)\/?$/.test(page) })],
  redirects: {
    '/services/secure-networking/': '/services/network-security-architecture/secure-networking/',
    '/services/network-redesign/': '/services/network-security-architecture/network-redesign/',
  },
  compressHTML: true,
});
