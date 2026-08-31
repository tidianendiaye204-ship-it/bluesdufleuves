const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "../src/assets");
const outputDir = path.join(__dirname, "../src/assets/optimized");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all files in input directory
fs.readdir(inputDir, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    // Check if it's an image file
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputFilePath = path.join(inputDir, file);

      // Get filename without extension
      const filename = path.parse(file).name;

      // Convert to WebP
      sharp(inputFilePath)
        .webp({ quality: 80 }) // 80 is a good balance between size and quality
        .toFile(path.join(outputDir, `${filename}.webp`))
        .then((info) => console.log(`Optimized (WebP): ${file}`))
        .catch((err) => console.error(`Error processing ${file}:`, err));

      // Convert to AVIF (smaller but slower to process)
      sharp(inputFilePath)
        .avif({ quality: 75 })
        .toFile(path.join(outputDir, `${filename}.avif`))
        .then((info) => console.log(`Optimized (AVIF): ${file}`))
        .catch((err) => console.error(`Error processing ${file}:`, err));
    }
  });
});
