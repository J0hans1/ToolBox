/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pu' : {
          beach : '#E4CAB0',
          rød : '#FF594A',
          seafoam : '#00B397',
          oker : '#FFB129',
          jungel : '#01595B',
          hav : '#05AFFF',
        },
      },
    },
  },
  plugins: [],
}