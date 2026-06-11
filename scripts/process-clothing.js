const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const CLOTHING_SRC = "C:\\Users\\osama\\Desktop\\SK V.1\\الملابس المعروضه للمتجر";
const CLOTHING_OUT = "C:\\Users\\osama\\Documents\\sk-boutique\\public\\clothing";

async function processClothing() {
  if (!fs.existsSync(CLOTHING_OUT)) {
    fs.mkdirSync(CLOTHING_OUT, { recursive: true });
  }

  const files = fs.readdirSync(CLOTHING_SRC).filter(f => f.match(/\.jpe?g$/i));
  console.log(`Found ${files.length} clothing images`);

  for (const file of files) {
    const srcPath = path.join(CLOTHING_SRC, file);
    // Extract base name without extension
    const baseName = path.basename(file, path.extname(file));
    const outPath = path.join(CLOTHING_OUT, `${baseName}.webp`);

    try {
      await sharp(srcPath)
        .resize(800, 1200, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 85, effort: 6 })
        .toFile(outPath);
      console.log(`  ✅ ${file} → ${baseName}.webp`);
    } catch (err) {
      console.error(`  ❌ ${file}: ${err.message}`);
    }
  }

  console.log("\n✅ All clothing images processed!");
}

processClothing().catch(console.error);
