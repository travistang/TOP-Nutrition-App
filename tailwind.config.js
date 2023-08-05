module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blur: {
          "0%": { backdropFilter: "blur(0)" },
          "100%": { backdropFilter: "blur(8px)" },
        },
        moveIn: {
          "0%": { opacity: 0, transform: "translateX(-50vw)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        moveUp: {
          "0%": { opacity: 0, transform: "translateY(150vh)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        blink: {
          "0%": { boxShadow: "0 0 2px 0 rgba(255, 99, 132,0.44)" },
          "25%": {
            boxShadow: "0 0 2px 4px rgba(255, 99, 132,0.44)",
          },
          "50%,100%": { boxShadow: "0 0 2px 4px transparent" },
        },
      },
      animation: {
        blur: "blur 0.3s ease-in-out forwards",
        "move-in": "moveIn 0.3s ease-in-out forwards",
        "move-up": "moveUp 0.3s ease-in-out forwards",
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
