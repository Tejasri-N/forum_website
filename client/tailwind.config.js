/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#1270ed",
        "custom-white": "#f2f2f2",
        "hover-color": "rgb(207, 244, 227)",
      },
      backgroundColor: {
        "custom-nav-bg": "rgb(33, 148, 255)",
        "custom-nav-bg-2": "rgb(2, 73, 138)",
        "custom-footer-bg": "rgb(55, 56, 94)",
        "custom-body-bg": "#fffdd0",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        rosario: ["Rosario", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      width: {
        "100p": "100%",
      },
      height: {
        "100p": "100%",
      },
      gridTemplateColumns: {
        "auto-fill-100": "repeat(auto-fill, minmax(100px, 1fr))",
      },
      screens: {
        sm: { max: "420px" },
        "md-3": { max: "1000px" },
        "md-1": { max: "800px" },
        "md-2": { min: "800px" },
      },
    },
  },
  plugins: [],
};
