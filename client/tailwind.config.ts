import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "@layer utilities",
    ".item { background: #FFD700; }",
  ],
  theme: {
    extend: {
      height: {
        "90vh": "90vh",
        "10vh": "10vh",
      },
    },
    colors: {
      dark: "#65ccb7",
      gray: "#f6f7fb",
      red: "#ef4444",

      black: "#182627",
      light: "#f2f2f2",
    },
  },
  plugins: [],
};
export default config;
