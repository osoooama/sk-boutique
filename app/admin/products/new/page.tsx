"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/components/Toast/ToastContext";
import ImageUploader from "@/components/admin/ImageUploader";
import ColorPicker from "@/components/admin/ColorPicker";
import { createProduct, uploadImage } from "@/lib/products-api";

const ALL_SIZES = ["S", "M", "L", "XL", "XXL"];
const CATEGORIES = [
  { id: "sets", ar: "أطقم" },
  { id: "outerwear", ar: "جاكيتات وبليزر" },
  { id: "blouses", ar: "بلوزات وقمصان" },
];

interface ColorRow {
  key: string;
  name: string;
  hex: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("sets");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<ColorRow[]>([{ key: crypto.randomUUID(), name: "", hex: "#1a1a1a" }]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleSize = (s: string) => {
    setSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const updateColor = (key: string, field: "name" | "hex", value: string) => {
    setColors((prev) => prev.map((c) => (c.key === key ? { ...c, [field]: value } : c)));
  };

  const addColor = () => {
    setColors((prev) => [...prev, { key: crypto.randomUUID(), name: "", hex: "#1a1a1a" }]);
  };

  const removeColor = (key: string) => {
    if (colors.length <= 1) return;
    setColors((prev) => prev.filter((c) => c.key !== key));
  };

  const inputStyle = (focus: boolean): React.CSSProperties => ({
    background: "rgba(255,255,255,0.05)",
    border: focus ? "1px solid #C9A84C" : "1px solid rgba(201,168,76,0.2)",
    color: "#F5F5F0",
    outline: "none",
    boxShadow: focus ? "0 0 16px rgba(201,168,76,0.15)" : "none",
    borderRadius: "12px",
    padding: "12px 16px",
    fontSize: "14px",
    width: "100%",
    transition: "all 0.2s ease",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim()) {
      addToast("error", "اسم المنتج بالعربية مطلوب");
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      addToast("error", "السعر مطلوب ويجب أن يكون رقم صحيح");
      return;
    }
    if (sizes.length === 0) {
      addToast("error", "اختر مقاس واحد على الأقل");
      return;
    }
    if (colors.some((c) => !c.name.trim())) {
      addToast("error", "جميع الألوان يجب أن يكون لها اسم");
      return;
    }

    setSubmitting(true);
    try {
      const uploaded: string[] = [];

      for (const img of imageUrls) {
        if (img.startsWith("blob:")) continue;
        uploaded.push(img);
      }

      const dbColors = colors.map((c) => ({
        name: c.name,
        englishName: "",
        hex: c.hex,
        images: uploaded,
      }));

      await createProduct({
        name_ar: nameAr.trim(),
        name_en: nameEn.trim(),
        price: Number(price),
        sizes,
        colors: dbColors,
        images: uploaded,
        category,
        description_ar: description.trim() || null,
        description_en: null,
        details_ar: null,
        details_en: null,
        shipping_ar: null,
        shipping_en: null,
        in_stock: inStock,
        featured,
      });

      addToast("success", "تم نشر المنتج بنجاح");
      router.push("/admin/dashboard");
    } catch (err) {
      addToast("error", "فشل النشر: " + (err instanceof Error ? err.message : "خطأ غير معروف"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ background: "transparent" }}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold" style={{ color: "#F5F5F0" }}>إضافة منتج جديد</h1>
          <Link
            href="/admin/dashboard"
            className="text-xs px-4 h-9 rounded-xl flex items-center transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#A8A89A",
            }}
          >
            <i className="fas fa-arrow-right ml-1.5" />
            عودة
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div
            className="rounded-xl p-5 space-y-5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.12)" }}
          >
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>اسم المنتج (عربي) *</label>
              <input
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مثال: طقم اللؤلؤ المخملي الفاخر"
                dir="rtl"
                style={inputStyle(false)}
                onFocus={(e) => Object.assign(e.currentTarget.style, inputStyle(true))}
                onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle(false))}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>اسم المنتج (إنجليزي)</label>
              <input
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="Example: Luxury Velvet Pearl Set"
                dir="ltr"
                style={inputStyle(false)}
                onFocus={(e) => Object.assign(e.currentTarget.style, inputStyle(true))}
                onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle(false))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>السعر *</label>
                <div className="relative">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    dir="rtl"
                    style={{ ...inputStyle(false), paddingLeft: "40px" }}
                    onFocus={(e) => Object.assign(e.currentTarget.style, { ...inputStyle(true), paddingLeft: "40px" })}
                    onBlur={(e) => Object.assign(e.currentTarget.style, { ...inputStyle(false), paddingLeft: "40px" })}
                  />
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs"
                    style={{ color: "#6B6B5F" }}
                  >
                    د.أ
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>التصنيف</label>
                <div className="flex gap-2 h-12">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className="flex-1 rounded-xl text-xs font-medium transition-all"
                      style={{
                        background: category === c.id ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
                        border: category === c.id ? "1px solid #C9A84C" : "1px solid rgba(255,255,255,0.06)",
                        color: category === c.id ? "#C9A84C" : "#6B6B5F",
                      }}
                    >
                      {c.ar}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>الوصف (عربي)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="وصف المنتج بالتفصيل..."
                dir="rtl"
                rows={3}
                style={inputStyle(false)}
                onFocus={(e) => Object.assign(e.currentTarget.style, inputStyle(true))}
                onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle(false))}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>المقاسات</label>
              <div className="flex gap-2 flex-wrap">
                {ALL_SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSize(s)}
                    className="h-11 min-w-[48px] rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: sizes.includes(s) ? "#C9A84C" : "rgba(255,255,255,0.05)",
                      border: sizes.includes(s) ? "1px solid #C9A84C" : "1px solid rgba(255,255,255,0.08)",
                      color: sizes.includes(s) ? "#0A0A0A" : "#A8A89A",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>الألوان</label>
                <button
                  type="button"
                  onClick={addColor}
                  className="text-[11px] h-8 px-3 rounded-lg flex items-center gap-1 transition-all"
                  style={{
                    background: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    color: "#C9A84C",
                  }}
                >
                  <i className="fas fa-plus text-[9px]" />
                  إضافة لون
                </button>
              </div>
              <div className="space-y-3">
                {colors.map((c, idx) => (
                  <div
                    key={c.key}
                    className="rounded-xl p-3 space-y-2"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px]" style={{ color: "#6B6B5F" }}>{idx + 1}.</span>
                      <input
                        value={c.name}
                        onChange={(e) => updateColor(c.key, "name", e.target.value)}
                        placeholder="اسم اللون"
                        dir="rtl"
                        className="flex-1 h-9 rounded-lg px-3 text-xs"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#F5F5F0",
                          outline: "none",
                        }}
                      />
                      {colors.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeColor(c.key)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors"
                          style={{ color: "#ff4444" }}
                        >
                          <i className="fas fa-times" />
                        </button>
                      )}
                    </div>
                    <ColorPicker
                      value={c.hex}
                      onChange={(hex) => updateColor(c.key, "hex", hex)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>الصور (حتى 5)</label>
              <ImageUploader
                maxImages={5}
                folder="products/clothing"
                images={imageUrls}
                onImagesChange={setImageUrls}
              />
            </div>

            <div className="flex gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: "#C9A84C" }}
                />
                <span className="text-xs" style={{ color: "#A8A89A" }}>متوفر للبيع</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: "#C9A84C" }}
                />
                <span className="text-xs" style={{ color: "#A8A89A" }}>منتج مميز - يظهر بالرئيسية</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              type="submit"
              disabled={submitting}
              className="flex-1 h-11 rounded-xl font-semibold text-sm"
              style={{
                background: submitting ? "rgba(201,168,76,0.3)" : "linear-gradient(135deg, #C9A84C, #D4B87A)",
                color: submitting ? "#6B6B5F" : "#0A0A0A",
              }}
              whileHover={submitting ? {} : { scale: 1.02 }}
              whileTap={submitting ? {} : { scale: 0.98 }}
            >
              {submitting ? (
                <><i className="fas fa-spinner fa-spin ml-1.5" /> جاري النشر...</>
              ) : "نشر المنتج"}
            </motion.button>
            <Link
              href="/admin/dashboard"
              className="flex-1 h-11 rounded-xl font-semibold text-sm flex items-center justify-center transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#A8A89A",
              }}
            >
              إلغاء
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
