/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        nav: '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        running: "url('/ico/icon-running.svg')",
        map: "url('/ico/icon-location.svg')",
        money: "url('/ico/icon-money.svg')",
      },
      fontFamily: {
        sans: ['Pretendard'],
      },
    },
  },
  plugins: [],
};
