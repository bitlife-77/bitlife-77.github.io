import fs from 'fs';
import path from 'path';

const root = process.cwd();
const sourceHtml = path.join(root, 'index.source.html');
const indexHtml = path.join(root, 'index.html');

if (fs.existsSync(sourceHtml)) {
  fs.copyFileSync(sourceHtml, indexHtml);
  console.log('Restored index.html from index.source.html (points to /src/main.js)');
}
