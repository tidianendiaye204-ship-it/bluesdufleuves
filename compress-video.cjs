const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
const path = require("path");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputPath = path.join(__dirname, "src", "assets", "baaba-maal-helping-francais.mp4");
const outputPath = path.join(
  __dirname,
  "src",
  "assets",
  "baaba-maal-helping-francais-compressed.mp4",
);

console.log(`Starting compression of ${inputPath}...`);
console.log("This may take several minutes depending on the video length.");

ffmpeg(inputPath)
  // Scale down to 720p maximum, keeping aspect ratio
  .size("?x720")
  // Use H.264 codec
  .videoCodec("libx264")
  // Set Constant Rate Factor (CRF). 28 is highly compressed but acceptable for web, 23 is default.
  // We'll use 28 to ensure it gets very small.
  .outputOptions(["-crf 28", "-preset fast"])
  // Audio compression
  .audioCodec("aac")
  .audioBitrate("128k")
  .on("progress", (progress) => {
    if (progress.percent) {
      process.stdout.write(`Processing: ${Math.round(progress.percent)}% done\r`);
    }
  })
  .on("end", () => {
    console.log("\nCompression finished successfully!");
    const oldSize = fs.statSync(inputPath).size / (1024 * 1024);
    const newSize = fs.statSync(outputPath).size / (1024 * 1024);
    console.log(`Original size: ${oldSize.toFixed(2)} MB`);
    console.log(`New size: ${newSize.toFixed(2)} MB`);

    // Once compressed, we can replace the old one or just let the user know
    console.log("You can now update the code to use the compressed version.");
  })
  .on("error", (err) => {
    console.error("\nError during compression:", err.message);
  })
  .save(outputPath);
