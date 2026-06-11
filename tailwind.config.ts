import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        luxury: {
          black: "#0A0A0A",
          white: "#FFFFFF",
          gold: "#C9A84C",
          "gold-light": "#E8C97A",
          "gold-dark": "#A07830",
          cream: "#F5F0E8",
          charcoal: "#1A1A1A",
          beige: "#EDE7DC",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8C96B",
          dark: "#A8873A",
        },
        surface: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          card: "var(--bg-card)",
          "card-hover": "var(--bg-card-hover)",
          nav: "var(--nav-bg)",
          footer: "var(--footer-bg)",
          page: "var(--page-bg)",
        },
        content: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          "on-accent": "var(--text-on-accent)",
        },
        accent: {
          gold: "var(--accent-gold)",
          "gold-hover": "var(--accent-gold-hover)",
          "gold-muted": "var(--accent-gold-muted)",
        },
        border: {
          DEFAULT: "var(--border-color)",
          strong: "var(--border-color-strong)",
        },
        input: {
          bg: "var(--input-bg)",
          border: "var(--input-border)",
          text: "var(--input-text)",
          placeholder: "var(--input-placeholder)",
        },
        button: {
          "primary-bg": "var(--button-primary-bg)",
          "primary-text": "var(--button-primary-text)",
          "secondary-bg": "var(--button-secondary-bg)",
          "secondary-border": "var(--button-secondary-border)",
          "secondary-text": "var(--button-secondary-text)",
        },
      },
      boxShadow: {
        "gold-sm": "0 2px 12px rgba(201,168,76,0.15)",
        "gold-md": "0 4px 20px rgba(201,168,76,0.25)",
        "gold-lg": "0 8px 35px rgba(201,168,76,0.35)",
      },
      fontFamily: {
        alexandria: ["var(--font-alexandria)"],
        inter: ["var(--font-inter)"],
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-up": "fade-up 0.6s ease-out forwards",
        shimmer: "shimmer 2s infinite linear",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.4s ease-out forwards",
        "slide-in-left": "slide-in-left 0.4s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "badge-pop": "badge-pop 0.4s ease-out forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201, 168, 76, 0.4)" },
          "50%": { boxShadow: "0 0 20px 10px rgba(201, 168, 76, 0.15)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "badge-pop": {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "70%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
