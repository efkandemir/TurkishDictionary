/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: '#E11E3C',
        softRed: '#F8F8F8',
        light: '#E8EAED',
        birlesikKelimeDark: '#2E494C',
        birlesikKelimeMedium: '#73A5AA',
        birlesikKelimeLight: '#E8F0F1',
        atasozleriDark: '#4F3822',
        atasozleriMedium: '#BB8E62',
        atasozleriLight: '#F9F5F1',
        textDark: '#0A151F',
        textMedium: '#48515B',
        textLight: '#758291',
      },
    },
  },
  plugins: [],
};
