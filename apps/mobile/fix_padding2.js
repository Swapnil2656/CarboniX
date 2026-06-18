const fs = require('fs');

const files = [
  'app/(tabs)/config.tsx',
  'app/(tabs)/settings.tsx',
  'app/(tabs)/history.tsx',
  'app/(tabs)/compare.tsx',
  'app/(tabs)/console.tsx'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  
  content = content.replace(/paddingBottom: 140/g, 'paddingBottom: 100');
  
  fs.writeFileSync(f, content);
});
console.log('Padding bottom set to 100.');
