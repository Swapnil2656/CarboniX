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
  
  // Fix config.tsx where paddingBottom is missing entirely in styles.content
  if (f.includes('config.tsx')) {
    content = content.replace(/content: {\s*paddingHorizontal: 20,\s*paddingVertical: 24,\s*gap: 16,\s*}/, `content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 140,
    gap: 16,
  }`);
  }
  
  // For the others, replace paddingBottom: 100 with 140 to give ample clearance for the Magic Indicator
  content = content.replace(/paddingBottom: 100/g, 'paddingBottom: 140');
  
  fs.writeFileSync(f, content);
});
console.log('Padding bottom increased successfully.');
