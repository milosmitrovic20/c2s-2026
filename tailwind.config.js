/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        c2s: ['Montserrat', 'Segoe UI', 'sans-serif'],
        script: ['Dancing Script', 'Segoe Script', 'cursive'],
      },
    },
  },
  plugins: [],
}