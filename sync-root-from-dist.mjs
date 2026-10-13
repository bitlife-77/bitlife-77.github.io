import fs from 'fs';
import path from 'path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const distAssetsDir = path.join(distDir, 'assets');
const rootAssetsDir = path.join(root, 'assets');
const publicDir = path.join(root, 'public');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFile(source, target) {
  fs.copyFileSync(source, target);
  console.log(`Copied: ${path.relative(root, target)}`);
}

function copyDir(sourceDir, targetDir) {
  ensureDir(targetDir);
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath);
    } else {
      copyFile(sourcePath, targetPath);
    }
  }
}

if (!fs.existsSync(distDir)) {
  throw new Error('dist directory not found. Run the build first.');
}

copyFile(path.join(distDir, 'index.html'), path.join(root, 'index.html'));

const dist404 = path.join(distDir, '404.html');
if (fs.existsSync(dist404)) {
  copyFile(dist404, path.join(root, '404.html'));
}

const distAdsTxt = path.join(distDir, 'ads.txt');
if (fs.existsSync(distAdsTxt)) {
  copyFile(distAdsTxt, path.join(root, 'ads.txt'));
}

const subpages = ['about.html', 'contact.html', 'dmca.html', 'tos.html', 'privacy.html', 'all-games.html'];
for (const subpage of subpages) {
  const distFile = path.join(distDir, subpage);
  if (fs.existsSync(distFile)) {
    copyFile(distFile, path.join(root, subpage));
  }
}

if (fs.existsSync(distAssetsDir)) {
  if (fs.existsSync(rootAssetsDir)) {
    fs.rmSync(rootAssetsDir, { recursive: true, force: true });
  }
  copyDir(distAssetsDir, rootAssetsDir);
}

const publicGamesJson = path.join(publicDir, 'games.json');
if (fs.existsSync(publicGamesJson)) {
  copyFile(publicGamesJson, path.join(root, 'games.json'));
}

const publicImgDir = path.join(publicDir, 'img');
const rootImgDir = path.join(root, 'img');
if (fs.existsSync(publicImgDir)) {
  copyDir(publicImgDir, rootImgDir);
}

console.log('Root publish files synced from dist.');
