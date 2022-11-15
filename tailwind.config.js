/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#192428',
        light: '#fff',
      },
      width: {
        main: 'calc(100% - 60px)',
        15: '60px',
      },
      padding: {
        15: '60px',
      },
      margin: {
        15: '60px',
      },
      aria: {
        branch: 'branch="selected"'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
