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
          gray: '#212121',
        },
      },
      boxShadow: {
        'special': 'inset 0 0 0 1px hsla(0,0%,0%, 0.1))',
      },
    },
  },
  plugins: [],
}