module.exports = {
  purge: [],
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      width: ['hover', 'focus'],
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
