/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },
      colors: {
        primary: {
          DEFAULT: '#1D0259'
        },
        orange: {
          100: '#D48744',
          200: '#F27329'
        },
        black: {
          100: '#0D0D0D'
        },
        purple: {
          100: '#1D0259',
          200: '#14023E',
          300: '#0E012C',
        }
      },
      height: {
        initial: 'initial',
        inherit: 'inherit'
      }
    },
  },
  plugins: [],
}
