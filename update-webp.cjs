const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const publicDir = path.join(__dirname, 'public');
const assetsDir = path.join(srcDir, 'assets');

// Get all files with webp extension in public and assets
const webpFiles = new Set();
const checkDir = (dir) => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.webp')) {
      webpFiles.add(file.replace('.webp', ''));
    }
  }
};
checkDir(publicDir);
checkDir(assetsDir);

console.log('Found WebP files:', webpFiles.size);

// Recursively find all ts/tsx files
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync(srcDir);
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  // Replace .jpg and .png with .webp
  // We match filename.(jpg|png) and if filename is in webpFiles, we replace it
  const regex = /([^/'"\s]+)\.(jpg|jpeg|png)/gi;
  newContent = newContent.replace(regex, (match, filename, ext) => {
    // Also remove %20 encoding if any
    const decodedName = decodeURIComponent(filename);
    if (webpFiles.has(decodedName) || webpFiles.has(filename)) {
      return `${filename}.webp`;
    }
    return match;
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Updated ${changedCount} files.`);
