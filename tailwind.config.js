module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blink: {
          "0%": { boxShadow: "0 0 2px 0 rgba(255, 99, 132,0.44)" },
          "25%": {
            boxShadow: "0 0 2px 4px rgba(255, 99, 132,0.44)",
          },
          "50%,100%": { boxShadow: "0 0 2px 4px transparent" },
        },
      },
      animation: {
        blink: "blink 1s ease-in-out infinite",
      },
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
