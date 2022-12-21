/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        main: {
          primary: "#4c3b2d",
          secondary: "#0d161d",
          "base-100": "#0d161d",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
