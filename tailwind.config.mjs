/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'; // Import default theme (ESM)

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add Inter to the beginning of the sans stack
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'neon-blue': '#22d3ee', // Example cyan/blue neon color
        'neon-green': '#34d399', // Example emerald/green neon color
        // You can add more shades or variations
        'neon-blue-light': '#67e8f9',
        'neon-green-light': '#6ee7b7',
      },
    },
  },
  plugins: [
  ],
}; 