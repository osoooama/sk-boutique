const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const dir = "C:\\Users\\osama\\Documents\\sk-boutique\\public\\clothing";

const targets = [
  ["sk_boutique977-photo-DHgKbsmNsb7-20250322_160119_485626926.webp", "velvet burgundy"],
  ["sk_boutique977-photo-DHgrFOOs96l-20250322_204636_485743576.webp", "velvet black"],
  ["sk_boutique977-thumbnail-DQKeh-EjLQA-20251023_223639_567438507.webp", "petroleum blue"],
  ["sk_boutique977-thumbnail-DQKfmC0jODi-20251023_224554_569566349.webp", "wrap black"],
  ["sk_boutique977-photo-DYsrFPZsvLJ-20260524_013125_706198458.webp", "blazer brown"],
  ["sk_boutique977-thumbnail-DYposBJsCwF-20260522_211341_703559149.webp", "champagne"],
  ["sk_boutique977-thumbnail-DYpsmnEMJA--20260522_214717_704427197.webp", "satin black"],
  ["sk_boutique977-thumbnail-DYpwc68sOWc-20260522_222040_704653143.webp", "pearl white"],
  ["sk_boutique977-thumbnail-DXhVfNNDObL-20260424_192008_674506967.webp", "chocolate"],
  ["sk_boutique977-thumbnail-DXhY4GyjJn8-20260424_194941_672357180.webp", "burgundy side"],
  ["sk_boutique977-thumbnail-DYpcx1FsCrl-20260522_192848_706629160.webp", "beige"],
  ["sk_boutique977-photo-DMdcVqDs9oL-20250723_211701_523124697.webp", "navy"],
  ["sk_boutique977-photo-DNOLea3MMcE-20250811_193226_530569642.webp", "charcoal"],
  ["sk_boutique977-photo-DPmVJN7jICH-20251009_214130_561922161.webp", "sapphire"],
];

async function getCenterColor(filePath) {
  const meta = await sharp(filePath).metadata();
  const { width, height } = meta;
  const cropPct = 0.5;
  const cropSize = Math.min(width, height) * cropPct;
  const left = (width - cropSize) / 2;
  const top = (height - cropSize) / 2;

  const { data, info } = await sharp(filePath)
    .extract({
      left: Math.round(left),
      top: Math.round(top),
      width: Math.round(cropSize),
      height: Math.round(cropSize),
    })
    .resize(30, 30)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = [];
  for (let i = 0; i < data.length; i += 3) {
    pixels.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
  }
  const avg = pixels.reduce(
    (acc, p) => ({
      r: acc.r + p.r / pixels.length,
      g: acc.g + p.g / pixels.length,
      b: acc.b + p.b / pixels.length,
    }),
    { r: 0, g: 0, b: 0 }
  );
  const toHex = (c) => Math.round(c).toString(16).padStart(2, "0");
  return "#" + toHex(avg.r) + toHex(avg.g) + toHex(avg.b);
}

(async () => {
  for (const [f, label] of targets) {
    const fp = path.join(dir, f);
    try {
      const hex = await getCenterColor(fp);
      console.log(label + " -> " + hex);
    } catch (e) {
      console.log(label + " -> ERROR: " + e.message.slice(0, 60));
    }
  }
})();
