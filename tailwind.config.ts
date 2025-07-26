import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'material-primary': '#6750A4',
        'material-onPrimary': '#FFFFFF',
        'material-surfaceLight': '#F8F9FA',
        'material-surfaceDark': '#2A2A3C',
        'material-bgLight': '#FFFFFF',
        'material-bgDark': '#1E1E2F',
        'material-textLight': '#1C1B1F',
        'material-textDark': '#E6E1E5',
        'material-outline': '#CAC4D0',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
