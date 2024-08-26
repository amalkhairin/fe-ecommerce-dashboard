import { COLORS } from './src/constants/colors.constant';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: COLORS.PRIMARY,
          dark: COLORS.PRIMARY_DARK,
          light: COLORS.PRIMARY_LIGHT,
          darker: COLORS.PRIMARY_DARKER
        },
        text: {
          white: COLORS.TEXT_WHITE,
          gray: COLORS.TEXT_GRAY
        },
        background: {
          gray: COLORS.BACKGROUND_GRAY
        }
      }
    },
  },
  plugins: [],
}

