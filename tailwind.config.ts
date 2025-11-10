/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e0f2fe",
          100: "#bae6fd",
          500: "#0284c7",
          700: "#0369a1",
        },
        accent: "#f59e0b",
      },
    },
  },
  plugins: [],
};
