import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
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
} satisfies Config

