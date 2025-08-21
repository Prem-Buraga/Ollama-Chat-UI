import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#0e0f13",
        panel: "#16181d",
        border: "#262a33",
        accent: "#7aa2f7",
        text: "#e6e6e6",
        subtext: "#a7a7a7"
      }
    }
  },
  darkMode: "class",
  plugins: []
};

export default config;
