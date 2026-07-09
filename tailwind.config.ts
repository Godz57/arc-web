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
        "titan-gold": "#b91c2c",
        "hud-cyan": "#4db8ff",
        "arc-blue": "#cfefff",
        chrome: "#b8c0d0",
        gunmetal: "#1a1f29",
        "red-alert": "#ff3b3b",
        carbon: "#0a0e14",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
      },
      backgroundImage: {
        "hud-grid":
          "linear-gradient(rgba(160, 45, 55, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(160, 45, 55, 0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        "hud-grid": "48px 48px",
      },
      boxShadow: {
        "glow-cyan": "0 0 14px rgba(0, 212, 255, 0.3)",
        "glow-gold": "0 0 14px rgba(212, 175, 55, 0.28)",
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
