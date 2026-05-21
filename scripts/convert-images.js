import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "../src/assets");

async function convertImages() {
  try {
    const files = fs
      .readdirSync(assetsDir)
      .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

    console.log(`🖼️  Converting ${files.length} images to WebP...`);

    for (const file of files) {
      const inputPath = path.join(assetsDir, file);
      const outputPath = path.join(
        assetsDir,
        file.replace(/\.(jpg|jpeg|png)$/i, ".webp"),
      );

      try {
        await sharp(inputPath)
          .webp({ quality: 85, alphaQuality: 100 })
          .toFile(outputPath);

        const inputSize = fs.statSync(inputPath).size;
        const outputSize = fs.statSync(outputPath).size;
        const saved = ((1 - outputSize / inputSize) * 100).toFixed(1);

        console.log(
          `✅ ${file} → ${path.basename(outputPath)} (${saved}% smaller)`,
        );
      } catch (err) {
        const error = err as Error;
        console.error(`❌ Error converting ${file}:`, error.message);
      }
    }

    console.log("\n✨ Image conversion complete!");
  } catch (err) {
    const error = err as Error;
    console.error("Error:", error);
    process.exit(1);
  }
}

convertImages();
