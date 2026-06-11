const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const PERFUME_SRC = "C:\\Users\\osama\\Desktop\\SK V.1\\العطور";
const PERFUME_OUT = "C:\\Users\\osama\\Documents\\sk-boutique\\public\\perfumes";

// Map by index since some filenames contain emojis
const FILE_ORDER = [
  "vaya-rose",
  "perfume-samples",
  "berry-blend",
  "bergamot-vanilla-violet",
  "berry-musk",
  "brides-musk",
  "rose-musk",
  "vaya-rose-notes",
  "pomegranate-musk",
];

async function processPerfumes() {
  if (!fs.existsSync(PERFUME_OUT)) {
    fs.mkdirSync(PERFUME_OUT, { recursive: true });
  }

  const files = fs.readdirSync(PERFUME_SRC).filter(f => f.match(/\.jpe?g$/i));
  console.log(`Found ${files.length} perfume images`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const slug = FILE_ORDER[i] || `perfume-${i}`;
    if (!slug) {
      console.log(`  ⚠️ No mapping for: ${file}`);
      continue;
    }
    const srcPath = path.join(PERFUME_SRC, file);
    const outPath = path.join(PERFUME_OUT, `${slug}.webp`);

    try {
      await sharp(srcPath)
        .resize(600, 800, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 90, effort: 6 })
        .toFile(outPath);
      console.log(`  ✅ ${slug}.webp`);
    } catch (err) {
      console.error(`  ❌ ${file}: ${err.message}`);
    }
  }

  console.log("\n✅ All perfume images processed!");
}

processPerfumes().catch(console.error);
