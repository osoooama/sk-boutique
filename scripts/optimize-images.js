const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const DIRS = [
  { src: path.join(__dirname, "..", "public", "clothing"), ext: "webp" },
  { src: path.join(__dirname, "..", "public", "perfumes"), ext: "webp" },
];

const MAX_WIDTH = 1200;
const QUALITY = 85;

async function optimizeDir(dir, targetExt) {
  if (!fs.existsSync(dir)) {
    console.log(`  ⚠️ Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir).filter((f) =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  console.log(`\n📁 ${path.basename(dir)} — ${files.length} files`);

  for (const file of files) {
    const srcPath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    const base = path.basename(file, ext);
    const outPath = path.join(dir, `${base}.${targetExt}`);

    try {
      const inputBuffer = fs.readFileSync(srcPath);
      const metadata = await sharp(inputBuffer).metadata();
      const width = Math.min(metadata.width || MAX_WIDTH, MAX_WIDTH);

      const outputBuffer = await sharp(inputBuffer)
        .resize(width, null, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 4 })
        .toBuffer();

      const oldSize = inputBuffer.length;
      const newSize = outputBuffer.length;
      const saved = ((1 - newSize / oldSize) * 100).toFixed(1);

      fs.writeFileSync(outPath, outputBuffer);

      console.log(`  ✅ ${base}.${targetExt} (${saved}% smaller)`);
    } catch (err) {
      console.error(`  ❌ ${file}: ${err.message}`);
    }
  }
}

async function main() {
  console.log("🖼️  SK BOUTIQUE — Image Optimizer\n");

  for (const dirConfig of DIRS) {
    await optimizeDir(dirConfig.src, dirConfig.ext);
  }

  console.log("\n✅ All images optimized!");
}

main().catch(console.error);
