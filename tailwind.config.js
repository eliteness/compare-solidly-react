/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        sm: '32px'
      }
    },
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '992px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1750px'
    }
  },
  plugins: []
};
