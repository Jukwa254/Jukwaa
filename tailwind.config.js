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
      'strokeOne': '#F1E5E2',
      'textOne': '#333333',
      'textTwo': '#796552',
      'textThree': '#6E7685',
      'BackgroundOne': '#F9F9F9',
      'BackgroundTwo': '#FFFFFF',
      'accent': '#6C2D1B',
      'BackgroundAccent': '#F4EEE9',
      'errorOne': '#ff4d4d',
      'errorTwo': '#ff9999',
      'successOne': '#00b300',
      'successTwo': '#99ff99',
    },
    extend: {},
  },
  plugins: [],
}