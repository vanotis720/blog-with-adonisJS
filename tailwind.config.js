/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    "./resources/views/**/*.edge",
    "./resources/assets/ts/**/*.ts",
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}