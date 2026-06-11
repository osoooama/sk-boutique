const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const LOGO_SRC = "C:\\Users\\osama\\Desktop\\SK V.1\\الشعار\\sk_boutique977-avatar--20260611_150406_462590207.jpg";
const LOGO_OUT_PNG = "C:\\Users\\osama\\Documents\\sk-boutique\\public\\logo\\sk-logo.png";
const LOGO_OUT_WEBP = "C:\\Users\\osama\\Documents\\sk-boutique\\public\\logo\\sk-logo.webp";

async function processLogo() {
  const metadata = await sharp(LOGO_SRC).metadata();
  console.log("Logo dimensions:", metadata.width, "x", metadata.height);

  // 1. Remove white/light background by threshold
  // Convert to PNG with transparency where pixels are close to white
  const pipeline = sharp(LOGO_SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = await pipeline;

  // Process pixels: make near-white pixels transparent
  const threshold = 200; // pixels with all channels > threshold become transparent
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // If pixel is light/white, make transparent
    if (r > threshold && g > threshold && b > threshold) {
      data[i + 3] = 0; // alpha = 0
    }
  }

  // Save as PNG with transparency
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize(400, 400, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(LOGO_OUT_PNG);

  // Save as WebP with transparency
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize(400, 400, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ lossless: true, quality: 100 })
    .toFile(LOGO_OUT_WEBP);

  console.log("✅ Logo processed and saved!");
  console.log(`   PNG: ${LOGO_OUT_PNG}`);
  console.log(`   WebP: ${LOGO_OUT_WEBP}`);
}

processLogo().catch(console.error);
