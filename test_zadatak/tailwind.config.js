/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
    colors: {
      'martian-red': '#EF4059',
      'martian-dark': '#3D3D3D',
      'martian-darkgray': '#8E8E8E',
      'martian-gray': '#C7C7C7',
      'martian-lightgray': '#F5F5F5',
      
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },
  plugins: [],
}

