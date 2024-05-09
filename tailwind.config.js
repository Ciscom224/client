
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'custom': '2px 2px rgba(250, 184, 13, 1)',
      },
      screens: {
        'custom': '920px',
        'custom2': '644px',
        'max-h-650': {'raw': '(max-height: 700px)'},
      },
    },
  },
  plugins: [],
}
