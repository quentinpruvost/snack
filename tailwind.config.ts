// tailwind.config.js

import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', ...fontFamily.sans], // Changer 'Poppins' pour 'Rubik'
      }
    }
  },
  plugins: []
};

export default config;