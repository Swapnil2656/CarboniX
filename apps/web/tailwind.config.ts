import type { Config } from "tailwindcss";
import path from "path";

const config: Config = {
  darkMode: "class",
  content: [
    path.join(__dirname, "./src/**/*.{js,ts,jsx,tsx,mdx}"),
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── Carbonix Core Palette (matches mobile theme) ─────────
        "background": "rgb(var(--background) / <alpha-value>)",
        "surface": "rgb(var(--surface) / <alpha-value>)",
        "surface-dim": "rgb(var(--surface-dim) / <alpha-value>)",
        "surface-bright": "rgb(var(--surface-bright) / <alpha-value>)",
        "surface-container-lowest": "rgb(var(--surface-container-lowest) / <alpha-value>)",
        "surface-container-low": "rgb(var(--surface-container-low) / <alpha-value>)",
        "surface-container": "rgb(var(--surface-container) / <alpha-value>)",
        "surface-container-high": "rgb(var(--surface-container-high) / <alpha-value>)",
        "surface-container-highest": "rgb(var(--surface-container-highest) / <alpha-value>)",
        "surface-variant": "rgb(var(--surface-variant) / <alpha-value>)",
        "surface-tint": "rgb(var(--surface-tint) / <alpha-value>)",
        // On-surface
        "on-background": "rgb(var(--on-background) / <alpha-value>)",
        "on-surface": "rgb(var(--on-surface) / <alpha-value>)",
        "on-surface-variant": "rgb(var(--on-surface-variant) / <alpha-value>)",
        // Outline
        "outline": "rgb(var(--outline) / <alpha-value>)",
        "outline-variant": "rgb(var(--outline-variant) / <alpha-value>)",
        // Inverse
        "inverse-surface": "rgb(var(--inverse-surface) / <alpha-value>)",
        "inverse-on-surface": "rgb(var(--inverse-on-surface) / <alpha-value>)",
        // Primary (yellow accent)
        "primary": "rgb(var(--primary) / <alpha-value>)",
        "on-primary": "rgb(var(--on-primary) / <alpha-value>)",
        "primary-container": "rgb(var(--primary-container) / <alpha-value>)",
        "on-primary-container": "rgb(var(--on-primary-container) / <alpha-value>)",
        "primary-fixed": "rgb(var(--primary-fixed) / <alpha-value>)",
        "primary-fixed-dim": "rgb(var(--primary-fixed-dim) / <alpha-value>)",
        "on-primary-fixed": "rgb(var(--on-primary-fixed) / <alpha-value>)",
        "on-primary-fixed-variant": "rgb(var(--on-primary-fixed-variant) / <alpha-value>)",
        "inverse-primary": "rgb(var(--inverse-primary) / <alpha-value>)",
        // Secondary (emerald green — eco-friendly theme)
        "secondary": "rgb(var(--secondary) / <alpha-value>)",
        "on-secondary": "rgb(var(--on-secondary) / <alpha-value>)",
        "secondary-container": "rgb(var(--secondary-container) / <alpha-value>)",
        "on-secondary-container": "rgb(var(--on-secondary-container) / <alpha-value>)",
        "secondary-fixed": "rgb(var(--secondary-fixed) / <alpha-value>)",
        "secondary-fixed-dim": "rgb(var(--secondary-fixed-dim) / <alpha-value>)",
        "on-secondary-fixed": "rgb(var(--on-secondary-fixed) / <alpha-value>)",
        "on-secondary-fixed-variant": "rgb(var(--on-secondary-fixed-variant) / <alpha-value>)",
        // Tertiary (cyan — matches mobile info)
        "tertiary": "rgb(var(--tertiary) / <alpha-value>)",
        "on-tertiary": "rgb(var(--on-tertiary) / <alpha-value>)",
        "tertiary-container": "rgb(var(--tertiary-container) / <alpha-value>)",
        "on-tertiary-container": "rgb(var(--on-tertiary-container) / <alpha-value>)",
        "tertiary-fixed": "rgb(var(--tertiary-fixed) / <alpha-value>)",
        "tertiary-fixed-dim": "rgb(var(--tertiary-fixed-dim) / <alpha-value>)",
        "on-tertiary-fixed": "rgb(var(--on-tertiary-fixed) / <alpha-value>)",
        "on-tertiary-fixed-variant": "rgb(var(--on-tertiary-fixed-variant) / <alpha-value>)",
        // Error
        "error": "rgb(var(--error) / <alpha-value>)",
        "on-error": "rgb(var(--on-error) / <alpha-value>)",
        "error-container": "rgb(var(--error-container) / <alpha-value>)",
        "on-error-container": "rgb(var(--on-error-container) / <alpha-value>)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm:      "0.25rem",
        lg:      "0.625rem",
        xl:      "0.75rem",
        "2xl":   "1rem",
        full:    "9999px",
      },
      spacing: {
        unit:   "4px",
        xs:     "4px",
        sm:     "8px",
        md:     "16px",
        lg:     "24px",
        xl:     "32px",
        "2xl":  "48px",
        "3xl":  "64px",
        gutter: "24px",
        margin: "48px",
      },
      fontFamily: {
        display:          ["Inter", "sans-serif"],
        "label-caps":     ["JetBrains Mono", "monospace"],
        code:             ["JetBrains Mono", "monospace"],
        "section-header": ["Inter", "sans-serif"],
        "body-md":        ["Inter", "sans-serif"],
        headline:         ["Inter", "sans-serif"],
        "display-mobile": ["Inter", "sans-serif"],
        "body-lg":        ["Inter", "sans-serif"],
      },
      fontSize: {
        display:          ["72px", { lineHeight: "1.1", letterSpacing: "-0.04em", fontWeight: "900" }],
        "label-caps":     ["12px", { lineHeight: "1",   letterSpacing: "0.1em",  fontWeight: "700" }],
        code:             ["14px", { lineHeight: "1.5",                           fontWeight: "400" }],
        "section-header": ["28px", { lineHeight: "1.3",                           fontWeight: "600" }],
        "body-md":        ["16px", { lineHeight: "1.5",                           fontWeight: "400" }],
        headline:         ["40px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-mobile": ["48px", { lineHeight: "1.1",                           fontWeight: "900" }],
        "body-lg":        ["18px", { lineHeight: "1.6",                           fontWeight: "400" }],
      },
      keyframes: {
        scroll: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        scroll:    "scroll 40s linear infinite",
        "fade-in": "fadeInUp 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;

