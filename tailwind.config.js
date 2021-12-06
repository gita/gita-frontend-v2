module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', "sans-serif"],
        dev: ["Noto Sans Devanagari", "sans-serif"],
      },
      colors: {
        "my-orange": "#F57903",
        "lead-text": "#FEDF89",
        "box-bg": "#FFFAEC",
        "box-stroke": "#FFE9B1",
        "nav-hover": "#FFF4D8",
        "light-bg": "#F7F7FC",
        "yellow-bg": "#FFF4D8",
        "dark-bg": "#1a1a1a",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
