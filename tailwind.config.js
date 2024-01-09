/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'strokeLight': '#e9e9e9',
      'strokeDark': '#353535',
      'textOne': '#575757',
      'textTwo': '#8b8b8b',
      'textThree': '#d3d3d3',
      'lightBackground': '#f9f9f9',
      'darkBackgroundOne': '#282828',
      'darkBackgroundTwo': '#212121',
      'accent': '#babd8d',
      'accentBackground': '#ebeffe',
    },
    extend: {},
  },
  plugins: [],
}