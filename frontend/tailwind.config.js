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
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        secGrey: '#E3E3E3',
        darkGrey: '#7D8D9C',
        tileBlue: '#A2BACC',
      },
      borderRadius : {
        'reviews': '22px',
        'submission': '50px',
      },
      fontSize: {
        'xxs': '0.9rem',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Hide scrollbar for Chrome, Safari and Opera */
          '-webkit-overflow-scrolling': 'touch', // smooth scrolling for iOS
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none', /* Chrome, Safari and Opera */
        },
      });
    },
  ],
}