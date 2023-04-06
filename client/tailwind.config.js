/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        water: '#0030a8',
        land: {
          400: '#5faf5a',
          600: '#5ea848'
        },
        industrial: '#bfd5d9',
        airport: '#8a9899',
        medical: '#e6cabc',
        base: '#e9e2ce',
        commercial: '#eae7c8',
        white: '#ffffff',
        black: '#000000',
        slate: colors.slate,
        red: colors.red,
        indigo: colors.indigo,
        emerald: colors.emerald
      }
    }
  },
  plugins: [
    // require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ]
};
