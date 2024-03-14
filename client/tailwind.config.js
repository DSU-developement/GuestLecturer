/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9b59b6",
        primary_light: "#e8d5e8",
        success: "#03A790",
        success_light: "#E9FAF7",
        secondary: "#F86624",
        secondary_light: "#FCE8C8",
        main_bg: "#F9F9FC",
        error: "#F21E1E",
        error_light: "#FEECEE",
        text_high: "#0C1421",
        text_low: "#ADADAD",
        text_dark: "#313957",
        text_light: "#959CB6",
        border_light: "#D9D9D9",
        disabled: "#ADADAD",
        border_dark: "#ADADAD",
        bg_light: "#F0F1F3",
        black_500: "#1D1F2C",
        black_300: "#777980",
      },
    },
  },
  plugins: [],
};
