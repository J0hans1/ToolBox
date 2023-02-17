/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pu' : {
          gul : '#FFD542',
          grunn : 'F7F7F7',
          svart : '#000000',
          ghost: '#64748B',
          gray: '#212121'
        },
      },
    },
  },
  plugins: [],
}