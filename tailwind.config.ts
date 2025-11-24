// tailwind.config.ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tailwindcssRtl from "tailwindcss-rtl";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media", // Enables manual dark mode toggle via HTML class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcssRtl, // RTL flipping support for Persian/Arabic layouts
  ],
};

export default config;
