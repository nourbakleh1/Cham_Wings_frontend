// const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    // flowbite.content(),
  ],
  theme: {
    extend: {
      screens: {
        xs: "230px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      colors: {
        primary_color: "#AE8A3B",
        primary_color_1: "#836E42",
        brown_color: "#584F3C",
        black_color: "#0c1524",
        secoundary_color: "#00529B",
        secoundary_color_1: "#134571",
        gray_color: "#abb8c3",
        white_color: "#ffffff",
        red_color: "#cf2e2e",
        green_color: "#00d084",
        off_white:"#e8e8e8e8"
      },
      backgroundImage: {
        "register-image": "url('/assets/images/register.svg')",
        "login-image": "url('/assets/images/login.svg')",
      },
    },
  },

  plugins: [],
};
