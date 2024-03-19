/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:["Monteserrat", "sans-serif"]
      },
      colors:{
        goldie: "#F6AE2D",
        pry: "#011627",
        faded: "#EDF4ED",
        wine: "#721121",
      }
    },
  },
  plugins: [],
}