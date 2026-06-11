const sharp = require("sharp");
const path = require("path");

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
  ["sk_boutique977-thumbnail-DXhXRfejHth-20260424_193611_672347469.webp", "burgundy alt"],
  ["sk_boutique977-thumbnail-DYpcx1FsCrl-20260522_192848_706629160.webp", "beige"],
  ["sk_boutique977-photo-DMdcVqDs9oL-20250723_211701_523124697.webp", "navy"],
  ["sk_boutique977-photo-DNOLea3MMcE-20250811_193226_530569642.webp", "charcoal"],
  ["sk_boutique977-photo-DPmVJN7jICH-20251009_214130_561922161.webp", "sapphire"],
];

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(c => Math.round(c).toString(16).padStart(2, "0")).join("");
}

// Simple k-means with k=5 on 100x100 image, pick most chromatic cluster
function kmeans(pixels, k, maxIter = 10) {
  // Initialize centroids evenly spread
  const step = Math.floor(pixels.length / k);
  const centroids = [];
  for (let i = 0; i < k; i++) {
    centroids.push({ ...pixels[Math.min(i * step, pixels.length - 1)] });
  }

  for (let iter = 0; iter < maxIter; iter++) {
    const clusters = Array.from({ length: k }, () => []);
    for (const p of pixels) {
      let minDist = Infinity, best = 0;
      for (let j = 0; j < k; j++) {
        const d = (p.r - centroids[j].r) ** 2 + (p.g - centroids[j].g) ** 2 + (p.b - centroids[j].b) ** 2;
        if (d < minDist) { minDist = d; best = j; }
      }
      clusters[best].push(p);
    }
    for (let j = 0; j < k; j++) {
      if (clusters[j].length === 0) continue;
      const sum = clusters[j].reduce((acc, p) => ({ r: acc.r + p.r, g: acc.g + p.g, b: acc.b + p.b }), { r: 0, g: 0, b: 0 });
      centroids[j] = { r: sum.r / clusters[j].length, g: sum.g / clusters[j].length, b: sum.b / clusters[j].length, count: clusters[j].length };
    }
  }
  return centroids;
}

async function getDominantColor(filePath) {
  const buf = await sharp(filePath).resize(80, 80).raw().toBuffer();
  const pixels = [];
  for (let i = 0; i < buf.length; i += 3) {
    const r = buf[i], g = buf[i+1], b = buf[i+2];
    const avg = (r + g + b) / 3;
    // Skip near-white (background) and near-black (shadows)
    if (avg > 230 || avg < 25) continue;
    pixels.push({ r, g, b });
  }
  
  if (pixels.length < 10) return "#888888";
  
  // Sample to keep it fast
  const sampled = [];
  const s = Math.max(1, Math.floor(pixels.length / 2000));
  for (let i = 0; i < pixels.length; i += s) sampled.push(pixels[i]);

  const clusters = kmeans(sampled, 5);
  
  // Score each cluster: count * saturation
  let bestCluster = clusters[0];
  let bestScore = 0;
  for (const c of clusters) {
    if (!c.count) continue;
    const max = Math.max(c.r, c.g, c.b);
    const min = Math.min(c.r, c.g, c.b);
    const sat = max === 0 ? 0 : (max - min) / max;
    const score = (c.count || 0) * sat;
    if (score > bestScore) {
      bestScore = score;
      bestCluster = c;
    }
  }
  
  return rgbToHex(bestCluster.r, bestCluster.g, bestCluster.b);
}

(async () => {
  for (const [f, label] of targets) {
    const fp = path.join(dir, f);
    try {
      const hex = await getDominantColor(fp);
      console.log(label + " -> " + hex);
    } catch (e) {
      console.log(label + " -> " + e.message.slice(0, 80));
    }
  }
})();
