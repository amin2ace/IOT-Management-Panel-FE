// tailwind.config.ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tailwindcssRtl from "tailwindcss-rtl";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables manual dark mode toggle via HTML class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          light: "#f9fafb",
          dark: "#111827",
        },
        // Industrial-grade color palette
        brand: {
          DEFAULT: "#4f46e5", // Indigo 600
          light: "#818cf8",
          dark: "#3730a3",
        },
        success: "#22c55e",
        warning: "#eab308",
        danger: "#ef4444",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        sans: ["Inter", "Vazirmatn", "sans-serif"],
      },
    },
  },
  plugins: [
    tailwindcssRtl, // RTL flipping support for Persian/Arabic layouts
  ],
};

export default config;
