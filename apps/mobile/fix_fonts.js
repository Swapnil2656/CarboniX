const fs = require('fs');
const files = [
  'app/(tabs)/config.tsx',
  'app/(tabs)/settings.tsx',
  'app/(tabs)/_layout.tsx',
  'app/(tabs)/history.tsx',
  'app/(tabs)/compare.tsx',
  'app/(tabs)/console.tsx',
  'app/results/[id].tsx'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  let lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("fontFamily: 'Inter'")) {
      let ctx = lines.slice(Math.max(0, i-3), Math.min(lines.length, i+4)).join('\n');
      if (ctx.match(/fontWeight:\s*'([789]00|bold)'/)) {
        lines[i] = lines[i].replace("'Inter'", "'Inter-Bold'");
      } else if (ctx.match(/fontWeight:\s*'([56]00)'/)) {
        lines[i] = lines[i].replace("'Inter'", "'Inter-SemiBold'");
      }
    } else if (lines[i].includes("fontFamily: 'JetBrains Mono'")) {
      let ctx = lines.slice(Math.max(0, i-3), Math.min(lines.length, i+4)).join('\n');
      if (ctx.match(/fontWeight:\s*'([789]00|bold)'/)) {
        lines[i] = lines[i].replace("'JetBrains Mono'", "'JetBrainsMono-Bold'");
      } else if (ctx.match(/fontWeight:\s*'([56]00)'/)) {
        lines[i] = lines[i].replace("'JetBrains Mono'", "'JetBrainsMono-Medium'");
      }
    }
  }
  fs.writeFileSync(f, lines.join('\n'));
});
console.log('Done');
