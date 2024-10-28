/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-header": "#283593",
        "bg-footer": "#E8EAF6",
        "bg-white": "#F5F5F5",
        "blue-button": "#3F51B5",
        "green-button": "#237804",
        "red-button": "#D9363E",
        "light-blue": "#C2C9EF",
      },
    },
  },
  plugins: [],
};
