import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50:  '#fdfdfc',
          100: '#f5f4f2',
          200: '#ebe9e6',
          300: '#dcd8d4',
          400: '#c1beb9',
          500: '#a6a49f',
          600: '#8a8985',
          700: '#6d6c69',
          800: '#52514f',
          900: '#3a3a39',
        },
      },
    },
  },
  plugins: [],
};
export default config;
