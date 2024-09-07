/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        secGrey: '#E3E3E3',
        tileBlue: '#A2BACC',
      },
    },
  },
  plugins: [],
}