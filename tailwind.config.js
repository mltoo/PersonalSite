/** @type {import('tailwindcss').Config} */
defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
        fontFamily: {
          'sans': ['"Clear Sans"', ...defaultTheme.fontFamily.sans]
        },
        colors: {
            themeBlue: '#053265'
        }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

