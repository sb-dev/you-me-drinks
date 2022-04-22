module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'sm': '2px 2px 0 #26b7c5;',
        'sm-red': '2px 2px 0 #EC6363',
        'md': '4px 4px 0 #99f2fb',
        'l': '8px 8px 0 #26b7c5', 
        'info-box': '5px 5px 0 #f3edcf', 
      },
      transformOrigin: {
        'top': '-2px -2px',
      }
    },
  },
  plugins: [],
}
