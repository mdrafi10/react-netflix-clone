/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textShadow: {
        md: "2px 2px 4px rgb(0 0 0 / 45%);",
      },
      backgroundImage: {
        "gradient-to-b":
          "linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);",
      },
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
