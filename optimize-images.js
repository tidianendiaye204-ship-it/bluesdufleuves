import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const festivalContentFile = path.join(process.cwd(), 'src', 'data', 'festival-content.ts');

async function optimizeImages() {
  console.log('Starting image optimization...');
  const files = fs.readdirSync(publicDir);
  const jpegFiles = files.filter(f => f.startsWith('gal') && f.endsWith('.jpeg'));
  
  if (jpegFiles.length === 0) {
    console.log('No JPEG images found to optimize.');
    return;
  }

  for (const file of jpegFiles) {
    const inputPath = path.join(publicDir, file);
    const outputFileName = file.replace('.jpeg', '.webp');
    const outputPath = path.join(publicDir, outputFileName);
    
    console.log(`Converting ${file} to ${outputFileName}...`);
    await sharp(inputPath)
      .resize({ width: 1200, withoutEnlargement: true }) // resize to max 1200px width to save space
      .webp({ quality: 80 }) // compress
      .toFile(outputPath);
      
    // Delete the original jpeg file after successful conversion
    fs.unlinkSync(inputPath);
  }
  
  console.log('All images converted and compressed. Updating festival-content.ts...');
  
  // Read and replace occurrences in festival-content.ts
  let content = fs.readFileSync(festivalContentFile, 'utf8');
  content = content.replace(/\.jpeg/g, '.webp');
  fs.writeFileSync(festivalContentFile, content, 'utf8');
  
  console.log('Finished updating references.');
}

optimizeImages().catch(console.error);
