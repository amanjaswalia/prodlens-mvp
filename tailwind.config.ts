import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-text": "var(--custom-text)",
        "card-bg": "var(--card-bg)",
        "sidebar-bg": "var(--sidebar-bg)",
        "border-color": "var(--border-color)",
        primary: "#0072BB",
        "primary-dark": "#005a94",
      },
      boxShadow: {
        "custom-full": "0 4px 10px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
