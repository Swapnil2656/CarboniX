import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── Carbonix Core Palette (matches mobile theme) ─────────
        background:                  "#000000",
        surface:                     "#000000",
        "surface-dim":               "#000000",
        "surface-bright":            "#353534",
        "surface-container-lowest":  "#0e0e0e",
        "surface-container-low":     "#1c1b1b",
        "surface-container":         "#201f1f",
        "surface-container-high":    "#2a2a2a",
        "surface-container-highest": "#353534",
        "surface-variant":           "#353534",
        "surface-tint":              "#f5c518",
        // On-surface
        "on-background":             "#e5e2e1",
        "on-surface":                "#e5e2e1",
        "on-surface-variant":        "#d1c5ac",
        // Outline
        outline:                     "#968f81",
        "outline-variant":           "#4e4633",
        // Inverse
        "inverse-surface":           "#e5e2e1",
        "inverse-on-surface":        "#313131",
        // Primary (yellow accent)
        primary:                     "#ffe5a0",
        "on-primary":                "#3d2f00",
        "primary-container":         "#f5c518",
        "on-primary-container":      "#695200",
        "primary-fixed":             "#ffe08b",
        "primary-fixed-dim":         "#f5c518",
        "on-primary-fixed":          "#241a00",
        "on-primary-fixed-variant":  "#584400",
        "inverse-primary":           "#745b00",
        // Secondary (emerald green — eco-friendly theme)
        secondary:                   "#10b981",
        "on-secondary":              "#ffffff",
        "secondary-container":       "#065f46",
        "on-secondary-container":    "#d1fae5",
        "secondary-fixed":           "#a7f3d0",
        "secondary-fixed-dim":       "#34d399",
        "on-secondary-fixed":        "#022c22",
        "on-secondary-fixed-variant":"#064e3b",
        // Tertiary (cyan — matches mobile info)
        tertiary:                    "#8BE9FD",
        "on-tertiary":               "#003641",
        "tertiary-container":        "#8BE9FD",
        "on-tertiary-container":     "#005e70",
        "tertiary-fixed":            "#8BE9FD",
        "tertiary-fixed-dim":        "#6bd4e8",
        "on-tertiary-fixed":         "#001f27",
        "on-tertiary-fixed-variant": "#004e5e",
        // Error
        error:                       "#ffb4ab",
        "on-error":                  "#690005",
        "error-container":           "#93000a",
        "on-error-container":        "#ffdad6",
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

