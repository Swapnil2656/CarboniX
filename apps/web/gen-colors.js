const fs = require('fs');

const colors = {
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
  "on-background":             "#e5e2e1",
  "on-surface":                "#e5e2e1",
  "on-surface-variant":        "#d1c5ac",
  outline:                     "#968f81",
  "outline-variant":           "#4e4633",
  "inverse-surface":           "#e5e2e1",
  "inverse-on-surface":        "#313131",
  primary:                     "#ffe5a0",
  "on-primary":                "#3d2f00",
  "primary-container":         "#f5c518",
  "on-primary-container":      "#695200",
  "primary-fixed":             "#ffe08b",
  "primary-fixed-dim":         "#f5c518",
  "on-primary-fixed":          "#241a00",
  "on-primary-fixed-variant":  "#584400",
  "inverse-primary":           "#745b00",
  secondary:                   "#10b981",
  "on-secondary":              "#ffffff",
  "secondary-container":       "#065f46",
  "on-secondary-container":    "#d1fae5",
  "secondary-fixed":           "#a7f3d0",
  "secondary-fixed-dim":       "#34d399",
  "on-secondary-fixed":        "#022c22",
  "on-secondary-fixed-variant":"#064e3b",
  tertiary:                    "#8BE9FD",
  "on-tertiary":               "#003641",
  "tertiary-container":        "#8BE9FD",
  "on-tertiary-container":     "#005e70",
  "tertiary-fixed":            "#8BE9FD",
  "tertiary-fixed-dim":        "#6bd4e8",
  "on-tertiary-fixed":         "#001f27",
  "on-tertiary-fixed-variant": "#004e5e",
  error:                       "#ffb4ab",
  "on-error":                  "#690005",
  "error-container":           "#93000a",
  "on-error-container":        "#ffdad6",
};

// Extremely rough light mode equivalents (inverted logic)
const lightColors = {
  background:                  "#fdfdfc",
  surface:                     "#fdfdfc",
  "surface-dim":               "#ded8e1",
  "surface-bright":            "#fdfdfc",
  "surface-container-lowest":  "#ffffff",
  "surface-container-low":     "#f7f2f6",
  "surface-container":         "#f1ecf0",
  "surface-container-high":    "#ebe6ea",
  "surface-container-highest": "#e5e0e4",
  "surface-variant":           "#e7e0ec",
  "surface-tint":              "#7a5900", // darker yellow for contrast
  "on-background":             "#1c1b1f",
  "on-surface":                "#1c1b1f",
  "on-surface-variant":        "#49454f",
  outline:                     "#79747e",
  "outline-variant":           "#cac4d0",
  "inverse-surface":           "#313033",
  "inverse-on-surface":        "#f4eff4",
  primary:                     "#7a5900",
  "on-primary":                "#ffffff",
  "primary-container":         "#ffdea4",
  "on-primary-container":      "#261900",
  "primary-fixed":             "#ffdea4",
  "primary-fixed-dim":         "#e8c16c",
  "on-primary-fixed":          "#261900",
  "on-primary-fixed-variant":  "#5c4200",
  "inverse-primary":           "#e8c16c",
  secondary:                   "#006c4b",
  "on-secondary":              "#ffffff",
  "secondary-container":       "#89f8c6",
  "on-secondary-container":    "#002114",
  "secondary-fixed":           "#89f8c6",
  "secondary-fixed-dim":       "#6cdbac",
  "on-secondary-fixed":        "#002114",
  "on-secondary-fixed-variant":"#005238",
  tertiary:                    "#00687a",
  "on-tertiary":               "#ffffff",
  "tertiary-container":        "#abedff",
  "on-tertiary-container":     "#001f26",
  "tertiary-fixed":            "#abedff",
  "tertiary-fixed-dim":        "#55d6f4",
  "on-tertiary-fixed":         "#001f26",
  "on-tertiary-fixed-variant": "#004e5c",
  error:                       "#ba1a1a",
  "on-error":                  "#ffffff",
  "error-container":           "#ffdad6",
  "on-error-container":        "#410002",
};

let cssDark = "html.dark {\n";
for (const [key, val] of Object.entries(colors)) {
  cssDark += `  --${key}: ${val};\n`;
}
cssDark += "}\n";

let cssLight = ":root {\n";
for (const [key, val] of Object.entries(lightColors)) {
  cssLight += `  --${key}: ${val};\n`;
}
cssLight += "}\n";

let tailwindColors = "{\n";
for (const key of Object.keys(colors)) {
  tailwindColors += `        "${key}": "var(--${key})",\n`;
}
tailwindColors += "      }";

fs.writeFileSync('d:/CarboniX/apps/web/colors-gen.txt', cssLight + '\n' + cssDark + '\n\n' + tailwindColors);
console.log('Done!');
