/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
      'primary': '#FF6347',

      's1': '#F5F5F5',
    
      's2': '#2E2E2E ',
    },
    
  },
    fontFamily:{
      'primary': ['montserrat', 'system-ui'],
      'secondary': ['open-sans', 'Georgia'],
      'menu': ['poppins', 'Georgia'],

    }
  },
  plugins: [],
}