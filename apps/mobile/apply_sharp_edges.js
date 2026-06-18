const fs = require('fs');

const files = [
  'app/(tabs)/config.tsx',
  'app/(tabs)/settings.tsx',
  'app/(tabs)/history.tsx',
  'app/(tabs)/compare.tsx',
  'app/(tabs)/console.tsx',
  'app/results/[id].tsx'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  
  // Replace borderRadius: <number> with borderRadius: 0
  // But be careful not to replace anything that should be a circle, like a small dot.
  // We'll replace all borderRadius. Brutalism has NO rounded corners.
  content = content.replace(/borderRadius:\s*\d+,/g, "borderRadius: 0,");
  
  fs.writeFileSync(f, content);
});
console.log('Sharp edges applied.');
