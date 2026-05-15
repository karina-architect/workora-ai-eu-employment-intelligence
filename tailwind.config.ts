import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        workora: {
          ink: "#0B1220",
          blue: "#315CFF",
          mint: "#16C7A7",
          soft: "#F6F8FC"
        }
      },
      boxShadow: {
        luxury: "0 40px 120px rgba(15,23,42,.10)"
      }
    }
  },
  plugins: []
};

export default config;
