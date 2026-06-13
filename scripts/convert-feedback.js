const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const INPUT_DIR = path.join(__dirname, "..", "public", "feedback");
const QUALITY = 80;

async function main() {
  const files = fs.readdirSync(INPUT_DIR).filter((f) => f.endsWith(".jpg"));

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputName = file.replace(/\.jpg$/i, ".webp");
    const outputPath = path.join(INPUT_DIR, outputName);

    if (fs.existsSync(outputPath)) {
      console.log(`SKIP (exists): ${outputName}`);
      continue;
    }

    await sharp(inputPath)
      .webp({ quality: QUALITY, effort: 4 })
      .toFile(outputPath);

    const orig = fs.statSync(inputPath).size;
    const comp = fs.statSync(outputPath).size;
    console.log(`OK: ${file} → ${outputName} (${(orig / 1024).toFixed(0)}KB → ${(comp / 1024).toFixed(0)}KB, ${Math.round((1 - comp / orig) * 100)}% saved)`);
  }

  console.log(`\nDone. Processed ${files.length} files.`);
}

main().catch(console.error);
