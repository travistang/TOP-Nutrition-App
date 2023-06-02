module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        highlight: "rgba(255, 99, 132, 1)",
        fat: "rgb(198 95 84 / <alpha-value>)",
        carbohydrates: "rgb(76 184 154 / <alpha-value>)",
        protein: "rgb(228 177 0 / <alpha-value>)",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
    },
  ],
};
