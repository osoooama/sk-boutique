const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const dir = "C:\\Users\\osama\\Documents\\sk-boutique\\public\\clothing";

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  } else {
    s = 0;
  }
  return { h: h * 360 | 0, s: s * 100 | 0, l: l * 100 | 0 };
}

function classifyColor(h, s, l) {
  if (l < 15) return { name: "Black", hex: "#1A1A1A" };
  if (l > 82 && s < 12) return { name: "White/Off-white", hex: "#F5F5F0" };
  if (s < 10) {
    if (l > 40) return { name: "Grey", hex: "#7F7F7F" };
    return { name: "Dark Grey", hex: "#3A3B3C" };
  }

  // Reds, pinks, burgundies
  if (h >= 340 || h <= 15) {
    if (l < 30) return { name: "Royal Burgundy", hex: "#6B1D2F" };
    if (s > 40 && l > 50) return { name: "Pink/Rose", hex: "#E090A0" };
    return { name: "Red/Burgundy", hex: "#8A1C2E" };
  }

  // Browns, Oranges, Beiges
  if (h > 15 && h <= 45) {
    if (l < 30) return { name: "Dark Brown", hex: "#4A2C1A" };
    if (l > 70 && s < 35) return { name: "Beige/Champagne", hex: "#D4C5A9" };
    if (l > 50 && s < 25) return { name: "Beige", hex: "#DDD0B8" };
    return { name: "Brown/Tan", hex: "#8B5A2B" };
  }

  // Yellows, warm golds
  if (h > 45 && h <= 65) {
    if (l > 75) return { name: "Light Beige/Cream", hex: "#F5F0E8" };
    return { name: "Mustard/Gold", hex: "#C9A84C" };
  }

  // Greens
  if (h > 65 && h <= 165) {
    if (l < 30) return { name: "Olive/Dark Green", hex: "#3D523D" };
    return { name: "Green", hex: "#4C8C4C" };
  }

  // Teals, Petroleum Blue
  if (h > 165 && h <= 210) {
    if (l < 35) return { name: "Petroleum Blue", hex: "#2A5C6E" };
    return { name: "Teal/Blue-Green", hex: "#3B7A8C" };
  }

  // Blues
  if (h > 210 && h <= 260) {
    if (l < 25) return { name: "Navy Blue", hex: "#1B2A4A" };
    return { name: "Sapphire Blue", hex: "#0F52BA" };
  }

  // Purples
  if (h > 260 && h <= 340) {
    if (l < 30) return { name: "Deep Purple", hex: "#4A2E6B" };
    return { name: "Purple/Mauve", hex: "#8C6B9C" };
  }

  return { name: "Unknown", hex: "#888888" };
}

async function getDominantColor(filePath) {
  const metadata = await sharp(filePath).metadata();
  const w = metadata.width, h = metadata.height;

  // Center-weighted crop to focus on fabric and avoid background
  const crop = {
    left: Math.round(w * 0.2),
    top: Math.round(h * 0.15),
    width: Math.round(w * 0.6),
    height: Math.round(h * 0.7)
  };

  const buf = await sharp(filePath).extract(crop).resize(50, 70).raw().toBuffer();

  // Find average RGB excluding white backdrop
  let sumR = 0, sumG = 0, sumB = 0, count = 0;
  for (let i = 0; i < buf.length; i += 3) {
    const r = buf[i], g = buf[i+1], b = buf[i+2];
    const avg = (r + g + b) / 3;
    // Skip studio white backdrop (typically high value and very neutral)
    if (avg > 238) continue;
    // Skip pure black shadows
    if (avg < 15) continue;

    sumR += r; sumG += g; sumB += b; count++;
  }

  if (count === 0) return { r: 128, g: 128, b: 128 };
  return { r: sumR / count, g: sumG / count, b: sumB / count };
}

async function run() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".webp"));
  console.log(`Analyzing ${files.length} images...\n`);

  const results = [];
  for (const file of files) {
    const fp = path.join(dir, file);
    try {
      const rgb = await getDominantColor(fp);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const classification = classifyColor(hsl.h, hsl.s, hsl.l);
      
      results.push({
        file,
        rgb,
        hsl,
        classification
      });
    } catch (e) {
      console.error(`Error on ${file}:`, e.message);
    }
  }

  // Sort by classification name then file name to group them
  results.sort((a, b) => {
    const nA = a.classification.name.localeCompare(b.classification.name);
    if (nA !== 0) return nA;
    return a.file.localeCompare(b.file);
  });

  results.forEach(r => {
    console.log(`${r.classification.name.padEnd(20)} | H:${String(r.hsl.h).padStart(3)} S:${String(r.hsl.s).padStart(3)} L:${String(r.hsl.l).padStart(3)} | ${r.file}`);
  });
}

run().catch(console.error);
