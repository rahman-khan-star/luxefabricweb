import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d7b5',
          300: '#e9bb85',
          400: '#df9854',
          500: '#d77c33',
          600: '#c96528',
          700: '#a74e23',
          800: '#864023',
          900: '#6d351f',
          950: '#3d1a0e',
        },
        fabric: {
          50: '#f5f3f0',
          100: '#e8e3db',
          200: '#d4cbb8',
          300: '#bcad90',
          400: '#a89572',
          500: '#998464',
          600: '#867058',
          700: '#6f5b49',
          800: '#5c4c3f',
          900: '#4d4036',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
