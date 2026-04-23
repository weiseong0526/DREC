import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1E88E5",
          light: "#26C1E8",
          deep: "#1565C0",
        },
        accent: {
          DEFAULT: "#7BC142",
          2: "#4CAF50",
        },
        hero: {
          red: "#5C1F2A",
        },
        state: {
          ok: "#4CAF50",
          warn: "#FFA726",
          bad: "#E53935",
          red: "#D63A4D",
        },
        ink: "#1A2A3A",
        muted: "#6B7A8A",
        soft: "#8FA3B8",
        line: "#E3E8F0",
        chip: "#E8F4FC",
        hl: { DEFAULT: "#FFF7E6", bd: "#F4D68F" },
        bg: "#F4F8FC",
        card: "#FFFFFF",
      },
      backgroundImage: {
        "drec-gradient":
          "linear-gradient(120deg, #1565C0 0%, #1E88E5 45%, #26C1E8 75%, #7BC142 100%)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Helvetica Neue",
          "PingFang SC",
          "Microsoft YaHei",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        card: "0 2px 6px rgba(20, 40, 70, 0.05)",
        pop: "0 8px 24px rgba(20, 40, 70, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
