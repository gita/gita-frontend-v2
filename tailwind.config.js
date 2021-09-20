module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'inter': ['"Inter"', 'cursive']
      },
      colors:{
        'my-orange':'#F57903'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
