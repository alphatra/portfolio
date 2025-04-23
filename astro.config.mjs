// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import vercel from "@astrojs/vercel/serverless";

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({}),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
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