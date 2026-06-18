const fs = require('fs');
const path = require('path');

const files = [
  'app/(tabs)/config.tsx',
  'app/(tabs)/settings.tsx',
  'app/(tabs)/history.tsx',
  'app/(tabs)/compare.tsx',
  'app/(tabs)/console.tsx',
  'app/results/[id].tsx'
];

files.forEach(f => {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');

  // We want to add `borderRadius: 12,` to any style block that has `borderWidth:` or `backgroundColor:` 
  // and doesn't already have `borderRadius:`.
  // Wait, some things shouldn't be rounded, like `container`, `topBar`, etc.
  // We can just add `borderRadius: 12` to `card`, `heroCard`, `realWorldStrip`, `stackedBarContainer`, `chip`, `picker`, etc.
  
  // A safer Regex approach:
  // Find block matching: name: { ... }
  content = content.replace(/([a-zA-Z0-9_]+):\s*\{([^}]+)\}/g, (match, name, inner) => {
    // Avoid rounding topBar, container, main, subNav
    const avoid = ['container', 'topBar', 'main', 'subNav', 'topBarLeft', 'topBarRight', 'legendRow', 'legendItem', 'emissionValueRow', 'sliderHeader', 'gridRow', 'chipsRow'];
    if (avoid.includes(name)) return match;
    
    // If it has borderWidth or backgroundColor
    if (inner.includes('borderWidth') || inner.includes('backgroundColor')) {
      // And it doesn't already have borderRadius
      if (!inner.includes('borderRadius') && !inner.includes('borderTopLeftRadius')) {
        return `${name}: {${inner}    borderRadius: 12,\n  }`;
      }
    }
    return match;
  });

  fs.writeFileSync(p, content);
});
console.log('Round edges applied broadly.');
