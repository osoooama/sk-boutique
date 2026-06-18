"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/components/GlassToast/ToastProvider";
import ImageUploader from "@/components/admin/ImageUploader";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { perfumes } from "@/lib/perfumes";
import { updatePerfume, deletePerfume } from "@/lib/products-api";

const SCENT_TYPES = ["مسك", "زهري", "عودي", "فواكهي", "خشبي", "شرقي"];
const VOLUMES = ["10ml", "30ml", "50ml", "100ml"];

export default function EditPerfumePage() {
  const router = useRouter();
  const params = useParams();
  const { show } = useToast();

  const perfume = perfumes.find((p) => p.id === params.id);

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [price, setPrice] = useState("");
  const [volume, setVolume] = useState("30ml");
  const [customVolume, setCustomVolume] = useState("");
  const [useCustomVolume, setUseCustomVolume] = useState(false);
  const [description, setDescription] = useState("");
  const [scentTypes, setScentTypes] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [_loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!perfume) return;
    setNameAr(perfume.title);
    setNameEn(perfume.englishTitle);
    setPrice(String(perfume.basePrice));
    const vol = perfume.volume;
    if (VOLUMES.includes(vol)) {
      setVolume(vol);
      setUseCustomVolume(false);
    } else {
      setCustomVolume(vol);
      setUseCustomVolume(true);
    }
    setDescription(perfume.description);
    if (perfume.image) setImageUrls([perfume.image]);
    setInStock(perfume.inStock);
    setLoaded(true);
  }, [perfume]);

  if (!perfume) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "transparent" }}>
        <div className="text-center space-y-3">
          <div className="text-4xl" style={{ color: "#C9A84C" }}><i className="fas fa-exclamation-circle" /></div>
          <p className="text-sm" style={{ color: "#A8A89A" }}>العطر غير موجود</p>
          <Link href="/admin/dashboard" className="inline-block text-xs px-4 h-9 rounded-xl font-medium transition-all"
            style={{ background: "rgba(201,168,76,0.1)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.2)", lineHeight: "36px" }}>
            العودة للوحة التحكم
          </Link>
        </div>
      </div>
    );
  }

  const toggleScent = (s: string) => {
    setScentTypes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim()) { show("error", "اسم العطر بالعربية مطلوب"); return; }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) { show("error", "السعر مطلوب"); return; }

    setSubmitting(true);
    try {
      const finalVolume = useCustomVolume ? customVolume : volume;
      const sizeMl = parseInt(finalVolume);

      await updatePerfume(perfume.id, {
        name_ar: nameAr.trim(),
        name_en: nameEn.trim(),
        price: Number(price),
        size_ml: isNaN(sizeMl) ? null : sizeMl,
        volume: finalVolume,
        scent_type: scentTypes,
        images: imageUrls,
        description_ar: description.trim() || null,
        in_stock: inStock,
        featured,
      });

      show("success", "تم حفظ التغييرات");
      router.push("/admin/dashboard");
    } catch (err) {
      show("error", "فشل الحفظ: " + (err instanceof Error ? err.message : "خطأ غير معروف"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePerfume(perfume.id);
      show("success", "تم حذف العطر");
      router.push("/admin/dashboard");
    } catch (err) {
      show("error", "فشل الحذف: " + (err instanceof Error ? err.message : "خطأ غير معروف"));
    }
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

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ background: "transparent" }}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold" style={{ color: "#F5F5F0" }}>تعديل العطر</h1>
          <div className="flex items-center gap-2">
            <span className="text-[10px]" style={{ color: "#6B6B5F" }}>آخر تعديل: {perfume.createdAt}</span>
            <Link href="/admin/dashboard" className="text-xs px-4 h-9 rounded-xl flex items-center transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#A8A89A" }}>
              <i className="fas fa-arrow-right ml-1.5" /> عودة
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-xl p-5 space-y-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.12)" }}>
            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>اسم العطر (عربي) *</label>
              <input value={nameAr} onChange={(e) => setNameAr(e.target.value)} placeholder="اسم العطر" dir="rtl" style={inputStyle(false)}
                onFocus={(e) => Object.assign(e.currentTarget.style, inputStyle(true))}
                onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle(false))} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>اسم العطر (إنجليزي)</label>
              <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Perfume name" dir="ltr" style={inputStyle(false)}
                onFocus={(e) => Object.assign(e.currentTarget.style, inputStyle(true))}
                onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle(false))} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>السعر *</label>
                <div className="relative">
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" dir="rtl"
                    style={{ ...inputStyle(false), paddingLeft: "40px" }}
                    onFocus={(e) => Object.assign(e.currentTarget.style, { ...inputStyle(true), paddingLeft: "40px" })}
                    onBlur={(e) => Object.assign(e.currentTarget.style, { ...inputStyle(false), paddingLeft: "40px" })} />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: "#6B6B5F" }}>د.أ</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>الحجم</label>
                <div className="flex flex-wrap gap-2">
                  {VOLUMES.map((v) => (
                    <button key={v} type="button" onClick={() => { setVolume(v); setUseCustomVolume(false); }}
                      className="h-10 px-3 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: !useCustomVolume && volume === v ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
                        border: !useCustomVolume && volume === v ? "1px solid #C9A84C" : "1px solid rgba(255,255,255,0.06)",
                        color: !useCustomVolume && volume === v ? "#C9A84C" : "#6B6B5F",
                      }}>
                      {v}
                    </button>
                  ))}
                  <button type="button" onClick={() => setUseCustomVolume(true)}
                    className="h-10 px-3 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: useCustomVolume ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
                      border: useCustomVolume ? "1px solid #C9A84C" : "1px solid rgba(255,255,255,0.06)",
                      color: useCustomVolume ? "#C9A84C" : "#6B6B5F",
                    }}>
                    أخرى
                  </button>
                </div>
                {useCustomVolume && (
                  <input value={customVolume} onChange={(e) => setCustomVolume(e.target.value)} placeholder="أدخل الحجم" dir="rtl" style={inputStyle(false)}
                    onFocus={(e) => Object.assign(e.currentTarget.style, inputStyle(true))}
                    onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle(false))} />
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>الوصف (عربي)</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="وصف العطر..." dir="rtl" rows={3}
                style={inputStyle(false)}
                onFocus={(e) => Object.assign(e.currentTarget.style, inputStyle(true))}
                onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle(false))} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>نوع العطر</label>
              <div className="flex gap-2 flex-wrap">
                {SCENT_TYPES.map((s) => (
                  <button key={s} type="button" onClick={() => toggleScent(s)}
                    className="h-9 px-4 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: scentTypes.includes(s) ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.04)",
                      border: scentTypes.includes(s) ? "1px solid #C9A84C" : "1px solid rgba(255,255,255,0.06)",
                      color: scentTypes.includes(s) ? "#C9A84C" : "#6B6B5F",
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium" style={{ color: "#C9A84C" }}>الصور (حتى 3)</label>
              <ImageUploader maxImages={3} folder="products/perfumes" images={imageUrls} onImagesChange={setImageUrls} />
            </div>

            <div className="flex gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="w-4 h-4" style={{ accentColor: "#C9A84C" }} />
                <span className="text-xs" style={{ color: "#A8A89A" }}>متوفر للبيع</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4" style={{ accentColor: "#C9A84C" }} />
                <span className="text-xs" style={{ color: "#A8A89A" }}>عطر مميز - يظهر بالرئيسية</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button type="submit" disabled={submitting}
              className="flex-1 h-11 rounded-xl font-semibold text-sm"
              style={{
                background: submitting ? "rgba(201,168,76,0.3)" : "linear-gradient(135deg, #C9A84C, #D4B87A)",
                color: submitting ? "#6B6B5F" : "#0A0A0A",
              }}
              whileHover={submitting ? {} : { scale: 1.02 }}
              whileTap={submitting ? {} : { scale: 0.98 }}>
              {submitting ? <><i className="fas fa-spinner fa-spin ml-1.5" /> جاري الحفظ...</> : "حفظ التغييرات"}
            </motion.button>
            <button type="button" onClick={() => setDeleteOpen(true)}
              className="h-11 px-6 rounded-xl font-semibold text-sm transition-all"
              style={{ background: "rgba(255,68,68,0.1)", border: "1px solid rgba(255,68,68,0.2)", color: "#ff6666" }}>
              <i className="fas fa-trash ml-1.5" /> حذف
            </button>
            <Link href="/admin/dashboard"
              className="flex-1 h-11 rounded-xl font-semibold text-sm flex items-center justify-center transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#A8A89A" }}>
              إلغاء
            </Link>
          </div>
        </form>
      </div>

      <ConfirmModal
        open={deleteOpen}
        title={`حذف ${perfume.title}`}
        message="هل أنت متأكد من حذف هذا العطر؟ لا يمكن التراجع عن هذا الإجراء."
        confirmLabel="تأكيد الحذف"
        confirmRed
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
