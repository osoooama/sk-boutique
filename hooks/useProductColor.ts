"use client";

import { useState, useEffect, useRef } from "react";

const FALLBACK = "#C9A84C";

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function extractDominant(data: Uint8ClampedArray): string {
  let r = 0, g = 0, b = 0, count = 0;
  for (let i = 0; i < data.length; i += 16) {
    const ri = data[i];
    const gi = data[i + 1];
    const bi = data[i + 2];
    const brightness = 0.299 * ri + 0.587 * gi + 0.114 * bi;
    if (brightness < 30 || brightness > 225) continue;
    r += ri; g += gi; b += bi; count++;
  }
  if (count === 0) return FALLBACK;
  return rgbToHex(Math.round(r / count), Math.round(g / count), Math.round(b / count));
}

export function useProductColor(imageUrl?: string) {
  const [dominant, setDominant] = useState(FALLBACK);
  const [loading, setLoading] = useState(false);
  const prevRef = useRef("");

  useEffect(() => {
    if (!imageUrl || imageUrl === prevRef.current) return;
    prevRef.current = imageUrl;
    setLoading(true);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) { setLoading(false); return; }

    const img = new (window as any).Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = 40;
      canvas.height = Math.round(40 * (img.naturalHeight / img.naturalWidth));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const hex = extractDominant(data);
      setDominant(hex);
      setLoading(false);
    };
    img.onerror = () => {
      setDominant(FALLBACK);
      setLoading(false);
    };
  }, [imageUrl]);

  return { dominantColor: dominant, loading };
}
