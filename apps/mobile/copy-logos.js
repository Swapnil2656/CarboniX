const fs = require('fs');
const path = require('path');

const sourceFile = 'C:\\Users\\shubh\\.gemini\\antigravity-ide\\brain\\243d73bc-e744-4a1b-ba35-a44c4efa6de1\\media__1783584207625.png';
const assetsDir = 'c:\\Users\\shubh\\CarboniX\\CarboniX\\apps\\mobile\\assets';

const targets = [
  'carbonix-logo.png',
  'icon.png',
  'splash-icon.png',
  'android-icon-foreground.png'
];

try {
  targets.forEach(target => {
    const dest = path.join(assetsDir, target);
    fs.copyFileSync(sourceFile, dest);
    console.log(`Successfully updated ${target}`);
  });
  console.log('\nAll logos updated! Now run: npx expo start -c --tunnel');
} catch (error) {
  console.error('Error copying files:', error);
}
