import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        yvape: {
          purple: "#7C3AED",
          blue: "#3B82F6",
          orange: "#F97316",
          dark: "#1E293B",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
