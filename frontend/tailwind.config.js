/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#10B981",
      secondary: "#86EFAC",
      accent: "#04d16e",
      white: "#FFFFFF",
      black: "#000000",
      grey: "#BEBEBE",
      lightgrey: "#F2F2F2",
      darkgrey: "#4A4A4A",
      red: "#DB0303",
      yellow: "#F0D803",
      blue: "#001AFF",
    },
    dropShadow: {
      slight: "0 1.2px 1.2px rgba(0,0,0,0.8)",
    },
    fontFamily: {
      jost: ["Jost", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
