/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
        fontFamily: {
          'sans': ['"Clear Sans"', ...defaultTheme.fontFamily.sans]
        },
        colors: {
            themeBlue: '#073b74'
        }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

