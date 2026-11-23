import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        oxblood: {
          DEFAULT: "#531B24",
          light: "#63222d",
          dark: "#3d131a",
        },
        wine: {
          DEFAULT: "#6A2931",
          light: "#7d323b",
          dark: "#521f25",
        },
        taupe: {
          DEFAULT: "#C6B7A2",
          light: "#d5cbba",
          dark: "#ad9d87",
        },
        cream: {
          DEFAULT: "#E7D8C3",
          light: "#f0e6d6",
          dark: "#d8c4a9",
        },
        ivory: {
          DEFAULT: "#F3ECE2",
          light: "#faf6f0",
          dark: "#e8ded0",
        },
        darkbg: {
          DEFAULT: "#2B1218",
          surface: "#3A1820",
          card: "#531B24",
          card2: "#6A2931",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px -2px rgba(83, 27, 36, 0.05), 0 1px 4px -1px rgba(83, 27, 36, 0.03)",
        card: "0 4px 20px -2px rgba(83, 27, 36, 0.08)",
        elevated: "0 10px 30px -5px rgba(83, 27, 36, 0.12)",
      },
      borderRadius: {
        'refined': '1rem',
      }
    },
  },
  plugins: [],
};
export default config;

