import type { Config } from "tailwindcss";

const config: Config = {
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
        "titan-gold": "#d4af37",
        "hud-cyan": "#00d4ff",
        "arc-blue": "#a8e6ff",
        "red-alert": "#ff3b3b",
        carbon: "#0a0e14",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
      },
      backgroundImage: {
        "hud-grid":
          "linear-gradient(rgba(0, 212, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "hud-grid": "48px 48px",
      },
      boxShadow: {
        "glow-cyan": "0 0 16px rgba(0, 212, 255, 0.4)",
        "glow-gold": "0 0 16px rgba(212, 175, 55, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
