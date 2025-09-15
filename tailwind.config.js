/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./Weather_App/**/*.{html,js}",
    "./calculator/**/*.{html,js}",
    "./currency_conversion/**/*.{html,js}"
  ],
  theme: {
    extend: {
        backgroundImage: {
        'banner': "url('./Weather_App/assets/images/banner.png')",
      },
    },
  },
  plugins: [],
}