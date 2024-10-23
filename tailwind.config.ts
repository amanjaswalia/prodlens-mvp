import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F0F4F7",
        foreground: "var(--foreground)",
        'custom-text': '#4B4B4B'
      },
      boxShadow: {
        'custom-full': '0 4px 10px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;
