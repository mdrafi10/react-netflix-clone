/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Using modern `rgb`
        buttonBg: "rgba(51, 51, 51, 0.5)",
        linearBg: "rgba(0, 0, 0, 0.4)",
        loginBg: "rgba(0, 0, 0, 0.75)",
      },
    },
  },
  plugins: [],
};
