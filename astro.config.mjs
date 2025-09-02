// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

import react from '@astrojs/react';
import vercel from "@astrojs/vercel";
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio-app-one-ebon.vercel.app',
  output: "server",
  adapter: vercel({}),
  integrations: [
    react(),
    sitemap()
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    }
  },

  // Internationalization configuration
  i18n: {
    // The default locale to fall back to if a locale isn't specified
    defaultLocale: 'pl',
    // A list of all locales supported by the site
    locales: ['pl', 'en', 'it', 'de'],
    // Routing strategy options
    routing: {
      // Add the locale prefix to all pages except the default locale
      prefixDefaultLocale: false,
      // Customize URL slugs for different languages (optional)
      // pages: {
      //   'en': {
      //     'about': 'about-us'
      //   },
      //   'pl': {
      //     'about': 'o-mnie'
      //   }
      // }
    }
  }
});