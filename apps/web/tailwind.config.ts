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
        // ─── Carbonix Core Palette ────────────────────────────────
        background:                  "#171309",
        surface:                     "#171309",
        "surface-dim":               "#171309",
        "surface-bright":            "#3e392d",
        "surface-container-lowest":  "#110e05",
        "surface-container-low":     "#1f1b11",
        "surface-container":         "#231f15",
        "surface-container-high":    "#2e2a1f",
        "surface-container-highest": "#393429",
        "surface-variant":           "#393429",
        "surface-tint":              "#f0c110",
        // On-surface
        "on-background":             "#ebe1d1",
        "on-surface":                "#ebe1d1",
        "on-surface-variant":        "#d1c5ac",
        // Outline
        outline:                     "#9a9078",
        "outline-variant":           "#4e4633",
        // Inverse
        "inverse-surface":           "#ebe1d1",
        "inverse-on-surface":        "#353025",
        // Primary (yellow accent)
        primary:                     "#ffe5a0",
        "on-primary":                "#3d2f00",
        "primary-container":         "#f5c518",
        "on-primary-container":      "#695200",
        "primary-fixed":             "#ffe08b",
        "primary-fixed-dim":         "#f0c110",
        "on-primary-fixed":          "#241a00",
        "on-primary-fixed-variant":  "#584400",
        "inverse-primary":           "#745b00",
        // Secondary (grey)
        secondary:                   "#c7c6c6",
        "on-secondary":              "#2f3031",
        "secondary-container":       "#464747",
        "on-secondary-container":    "#b5b5b5",
        "secondary-fixed":           "#e3e2e2",
        "secondary-fixed-dim":       "#c7c6c6",
        "on-secondary-fixed":        "#1b1c1c",
        "on-secondary-fixed-variant":"#464747",
        // Tertiary (cyan)
        tertiary:                    "#bdefff",
        "on-tertiary":               "#003641",
        "tertiary-container":        "#49dbff",
        "on-tertiary-container":     "#005e70",
        "tertiary-fixed":            "#b0ecff",
        "tertiary-fixed-dim":        "#42d7fb",
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

