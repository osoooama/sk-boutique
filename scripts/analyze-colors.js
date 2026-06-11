const sharp = require("sharp");
const path = require("path");

const dir = "C:\\Users\\osama\\Documents\\sk-boutique\\public\\clothing";

const targets = [
  { file: "sk_boutique977-photo-DHgKbsmNsb7-20250322_160119_485626926.webp", name: "Royal Burgundy (Velvet Set)" },
  { file: "sk_boutique977-photo-DHgrFOOs96l-20250322_204636_485743576.webp", name: "Deep Black (Velvet Set)" },
  { file: "sk_boutique977-thumbnail-DQKeh-EjLQA-20251023_223639_567438507.webp", name: "Petroleum Blue (Wrap Set)" },
  { file: "sk_boutique977-thumbnail-DQKfmC0jODi-20251023_224554_569566349.webp", name: "Royal Black (Wrap Set)" },
  { file: "sk_boutique977-photo-DYsrFPZsvLJ-20260524_013125_706198458.webp", name: "Dark Brown (Blazer)" },
  { file: "sk_boutique977-thumbnail-DYposBJsCwF-20260522_211341_703559149.webp", name: "Champagne Beige (Satin Blouse)" },
  { file: "sk_boutique977-thumbnail-DYpsmnEMJA--20260522_214717_704427197.webp", name: "Royal Black (Satin Blouse)" },
  { file: "sk_boutique977-thumbnail-DYpwc68sOWc-20260522_222040_704653143.webp", name: "Pearl White (Satin Blouse)" },
  { file: "sk_boutique977-thumbnail-DXhVfNNDObL-20260424_192008_674506967.webp", name: "Chocolate Brown (Side-Tie)" },
  { file: "sk_boutique977-thumbnail-DXhY4GyjJn8-20260424_194941_672357180.webp", name: "Royal Burgundy (Side-Tie)" },
  { file: "sk_boutique977-thumbnail-DYpcx1FsCrl-20260522_192848_706629160.webp", name: "Classic Beige (Side-Tie)" },
  { file: "sk_boutique977-photo-DMdcVqDs9oL-20250723_211701_523124697.webp", name: "Navy Blue (Dress)" },
  { file: "sk_boutique977-photo-DNOLea3MMcE-20250811_193226_530569642.webp", name: "Charcoal (Blazer Set)" },
  { file: "sk_boutique977-photo-DPmVJN7jICH-20251009_214130_561922161.webp", name: "Sapphire Blue (Top Set)" },
];

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(c => Math.round(c).toString(16).padStart(2, "0")).join("");
}

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
  }
  return { h: h * 360 | 0, s: s * 100 | 0, l: l * 100 | 0 };
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) { r = g = b = l; }
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}

// Skin hue range (in degrees): 10-50
function isSkinHue(h, s, l) {
  return h >= 10 && h <= 50 && s >= 5 && s <= 55 && l >= 20 && l <= 85;
}

// Check if color is neutral background
function isNeutral(s, l) {
  return (s < 8 && l > 75) || (s < 4 && l < 12);
}

async function getDominantColor(filePath) {
  const metadata = await sharp(filePath).metadata();
  const w = metadata.width, h = metadata.height;

  // Take center 50% crop
  const crop = { left: Math.round(w * 0.25), top: Math.round(h * 0.15), width: Math.round(w * 0.5), height: Math.round(h * 0.7) };
  const buf = await sharp(filePath).extract(crop).resize(60, 84).raw().toBuffer();

  // Build weighted hue histogram (360 bins)
  const hist = new Array(360).fill(0);
  let totalWeight = 0;

  for (let i = 0; i < buf.length; i += 3) {
    const r = buf[i], g = buf[i+1], b = buf[i+2];
    const { h, s, l } = rgbToHsl(r, g, b);

    // Skip background and skin
    if (isNeutral(s, l)) continue;
    if (isSkinHue(h, s, l)) continue;
    // Skip very dark or very light
    if (l < 8 || l > 92) continue;

    // Weight by saturation squared × (1 - |l - 50|/50) to prefer colorful mid-tone pixels
    const wgt = (s / 100) ** 2 * (1 - Math.abs(l - 50) / 50);
    hist[h] += wgt;
    totalWeight += wgt;
  }

  if (totalWeight < 1) {
    // Fallback: less filtering
    for (let i = 0; i < buf.length; i += 3) {
      const r = buf[i], g = buf[i+1], b = buf[i+2];
      const { h, s, l } = rgbToHsl(r, g, b);
      if (l < 5 || l > 95) continue;
      hist[h] += (s / 100) ** 2;
      totalWeight += (s / 100) ** 2;
    }
  }

  if (totalWeight < 1) return "#888888";

  // Find peaks in histogram (smooth with 3-bin window)
  const smoothed = [];
  for (let i = 0; i < 360; i++) {
    const prev = hist[(i - 1 + 360) % 360];
    const next = hist[(i + 1) % 360];
    smoothed.push((prev + hist[i] + next) / 3);
  }

  // Find the highest peak
  let peakHue = 0, peakVal = 0;
  for (let i = 0; i < 360; i++) {
    if (smoothed[i] > peakVal) {
      peakVal = smoothed[i];
      peakHue = i;
    }
  }

  // Now compute average saturation & lightness for pixels matching this hue range
  let hueRange = 30;
  // For very saturated colors, use narrower range
  if (peakVal > totalWeight * 0.4) hueRange = 20;

  let sumS = 0, sumL = 0, count = 0;
  for (let i = 0; i < buf.length; i += 3) {
    const r = buf[i], g = buf[i+1], b = buf[i+2];
    const { h, s, l } = rgbToHsl(r, g, b);
    const diff = Math.min(Math.abs(h - peakHue), 360 - Math.abs(h - peakHue));
    if (diff <= hueRange && l > 10 && l < 92) {
      if (s > 5 || l < 40) {
        sumS += s; sumL += l; count++;
      }
    }
  }

  if (count === 0) {
    // Fallback
    for (let i = 0; i < buf.length; i += 3) {
      const r = buf[i], g = buf[i+1], b = buf[i+2];
      const { h, s, l } = rgbToHsl(r, g, b);
      if (l > 10 && l < 92) { sumS += s; sumL += l; count++; }
    }
  }

  if (count === 0) return "#888888";

  const avgH = peakHue;
  const avgS = sumS / count;
  const avgL = sumL / count;

  const { r, g, b } = hslToRgb(avgH, avgS, avgL);
  return rgbToHex(r, g, b);
}

(async () => {
  console.log("=== SK BOUTIQUE — Color Analysis v3 (Hue Peak) ===\n");
  for (const { file, name } of targets) {
    const fp = path.join(dir, file);
    try {
      const hex = await getDominantColor(fp);
      console.log(`${name.padEnd(40)} ${hex.toUpperCase()}`);
    } catch (e) {
      console.log(`${name.padEnd(40)} ERROR: ${e.message}`);
    }
  }
})();
