module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          medium: '#005c98',
        },
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
      scale: ['hover'],
    },
  },
  important: true,
  plugins: [],
};
