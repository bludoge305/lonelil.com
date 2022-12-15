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
          primary: "#48556c",
          secondary: "#3d455b",
          "base-100": "#3d455b",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
