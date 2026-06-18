"use client";

import { useState, useRef, useCallback } from "react";
import { uploadImage } from "@/lib/products-api";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  originalSize: number;
  webpSize: number | null;
  status: "pending" | "converting" | "converted" | "uploading" | "done" | "error";
  url: string | null;
  error?: string;
}

interface ImageUploaderProps {
  maxImages?: number;
  folder: string;
  images: string[];
  onImagesChange: (urls: string[]) => void;
}

async function convertToWebP(file: File): Promise<File> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await new Promise<void>((r) => { img.onload = () => r(); });
  const maxWidth = 1200;
  const ratio = Math.min(1, maxWidth / img.width);
  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;
  ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((r) =>
    canvas.toBlob((b) => r(b), "image/webp", 0.85)
  );
  URL.revokeObjectURL(img.src);
  return new File([blob!], file.name.replace(/\.[^.]+$/, ".webp"), { type: "image/webp" });
}

export default function ImageUploader({ maxImages = 5, folder, images, onImagesChange }: ImageUploaderProps) {
  const [items, setItems] = useState<ImageFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/heic"];
    const newItems: ImageFile[] = [];

    for (const file of Array.from(files)) {
      if (!allowed.includes(file.type)) continue;
      if (newItems.length + items.length + images.length >= maxImages) break;

      const id = crypto.randomUUID();
      const preview = URL.createObjectURL(file);

      const item: ImageFile = {
        id, file, preview,
        originalSize: file.size,
        webpSize: null,
        status: "converting",
        url: null,
      };
      newItems.push(item);
    }

    if (newItems.length === 0) return;
    setItems((prev) => [...prev, ...newItems]);

    for (const item of newItems) {
      try {
        const webpFile = await convertToWebP(item.file);
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, file: webpFile, webpSize: webpFile.size, status: "uploading" }
              : i
          )
        );

        const publicUrl = await uploadImage(webpFile, folder);

        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: "done", url: publicUrl }
              : i
          )
        );

        onImagesChange([...images, publicUrl]);
      } catch (err) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === item.id
              ? { ...i, status: "error", error: err instanceof Error ? err.message : "فشل الرفع" }
              : i
          )
        );
      }
    }
  }, [items, maxImages, folder, images, onImagesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const removeExisting = useCallback((index: number) => {
    const newUrls = images.filter((_, i) => i !== index);
    onImagesChange(newUrls);
  }, [images, onImagesChange]);

  const moveItem = useCallback((from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, [items.length]);

  const removeBgColor = "#1a1a1a";

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && addFiles(e.target.files)}
      />

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all"
        style={{
          borderColor: dragOver ? "#C9A84C" : "rgba(201,168,76,0.3)",
          background: dragOver ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.02)",
        }}
      >
        <i className="fas fa-cloud-upload-alt text-3xl mb-3 block" style={{ color: "#C9A84C" }} />
        <p className="text-sm font-medium" style={{ color: "#F5F5F0" }}>
          اسحب وأفلت الصور هنا أو اضغط للاختيار
        </p>
        <p className="text-xs mt-1" style={{ color: "#6B6B5F" }}>
          JPEG, PNG, WebP, HEIC — حتى {maxImages} صور
        </p>
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="relative rounded-xl overflow-hidden group aspect-square"
              style={{ background: removeBgColor, border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <img
                src={item.preview}
                alt=""
                className="w-full h-full object-cover"
              />

              {item.status === "converting" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-xs" style={{ color: "#C9A84C" }}>
                  <i className="fas fa-spinner fa-spin text-lg mb-1" />
                  جاري التحويل...
                </div>
              )}

              {item.status === "uploading" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-xs" style={{ color: "#C9A84C" }}>
                  <i className="fas fa-cloud-upload-alt fa-spin text-lg mb-1" />
                  جاري الرفع...
                </div>
              )}

              {item.status === "done" && (
                <div className="absolute top-1 right-1 text-[10px] px-1.5 py-0.5 rounded-md bg-green-500/80 text-white">
                  <i className="fas fa-check ml-0.5" />رفع
                </div>
              )}

              {item.status === "error" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs text-red-400">
                  {item.error || "خطأ"}
                </div>
              )}

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                className="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(255,0,0,0.8)" }}
              >
                <i className="fas fa-times" />
              </button>

              <div className="absolute bottom-1 left-1 right-1 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); moveItem(idx, idx - 1); }}
                  disabled={idx === 0}
                  className="w-6 h-6 rounded flex items-center justify-center text-xs"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    color: idx === 0 ? "#6B6B5F" : "#F5F5F0",
                  }}
                >
                  <i className="fas fa-chevron-right" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); moveItem(idx, idx + 1); }}
                  disabled={idx === items.length - 1}
                  className="w-6 h-6 rounded flex items-center justify-center text-xs"
                  style={{
                    background: "rgba(0,0,0,0.6)",
                    color: idx === items.length - 1 ? "#6B6B5F" : "#F5F5F0",
                  }}
                >
                  <i className="fas fa-chevron-left" />
                </button>
              </div>

              {idx === 0 && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.9)", color: "#0A0A0A" }}>
                  رئيسية
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div>
          <p className="text-xs mb-2 font-medium" style={{ color: "#6B6B5F" }}>مرفوعة سابقاً:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((url, idx) => (
              <div
                key={url}
                className="relative rounded-xl overflow-hidden group aspect-square"
                style={{ background: removeBgColor, border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => removeExisting(idx)}
                  className="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(255,0,0,0.8)" }}
                >
                  <i className="fas fa-times" />
                </button>
                {idx === 0 && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(201,168,76,0.9)", color: "#0A0A0A" }}>
                    رئيسية
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {items.some((i) => i.webpSize !== null && i.originalSize > 0) && (
        <div className="flex flex-wrap gap-2">
          {items
            .filter((i) => i.webpSize !== null && i.originalSize > 0)
            .map((item) => {
              const reduction = item.webpSize !== null
                ? ((1 - item.webpSize / item.originalSize) * 100).toFixed(0)
                : null;
              const origKB = (item.originalSize / 1024).toFixed(1);
              const webpKB = item.webpSize !== null ? (item.webpSize / 1024).toFixed(1) : "?";
              return (
                <span
                  key={item.id}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(201,168,76,0.1)", color: "#C9A84C" }}
                >
                  {item.status === "done" ? <><i className="fas fa-check ml-1" />رفع</> : `${origKB}KB → ${webpKB}KB ${reduction ? `(-${reduction}%)` : ""}`} ✓
                </span>
              );
            })}
        </div>
      )}

      <p className="text-[10px]" style={{ color: "#6B6B5F" }}>
        أول صورة = الصورة الرئيسية. اسحب لإعادة الترتيب.
      </p>
    </div>
  );
}
