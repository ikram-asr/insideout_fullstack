/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'figma-blue': '#003059',
        'figma-nav-green': '#00927C',
        'figma-light-green':'#ccf0ec',
      },
    },
  },
  plugins: [],
}

