/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#141414',
        secondary: '#D12323',
        blight: '#F2F2F2', //light background for cards etc.
        bdark: '#1D2228' //dark background for cards etc.
      }
    },
  },
  plugins: [],
}

