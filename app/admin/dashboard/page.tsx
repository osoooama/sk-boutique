"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/components/GlassToast/ToastProvider";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { getLocalProducts, getLocalPerfumes } from "@/lib/local-store";
import { deleteProduct, deletePerfume } from "@/lib/products-api";

type Tab = "products" | "perfumes";
type Filter = "all" | "available" | "unavailable" | "featured";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { show } = useToast();
  const [tab, setTab] = useState<Tab>("products");
  const [filter, setFilter] = useState<Filter>("all");
  const [deleteTarget, setDeleteTarget] = useState<{ type: Tab; id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    try {
      const authed = localStorage.getItem("sk_admin_auth");
      if (authed !== "true") router.replace("/admin");
    } catch {
      router.replace("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    try { localStorage.removeItem("sk_admin_auth"); } catch { /* ignore */ }
    show("info", "تم تسجيل الخروج");
    router.push("/admin");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteTarget.type === "products") {
        await deleteProduct(deleteTarget.id);
      } else {
        await deletePerfume(deleteTarget.id);
      }
      show("success", `تم حذف ${deleteTarget.name}`);
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      show("error", "فشل الحذف: " + (err instanceof Error ? err.message : "خطأ غير معروف"));
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const allProducts = getLocalProducts();
  const allPerfumes = getLocalPerfumes();
  const sortedProducts = [...allProducts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const sortedPerfumes = [...allPerfumes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const lastProduct = sortedProducts[0];
  const lastPerfume = sortedPerfumes[0];
  const lastAdded = lastProduct && lastPerfume
    ? (new Date(lastProduct.createdAt) > new Date(lastPerfume.createdAt) ? lastProduct : lastPerfume)
    : (lastProduct || lastPerfume);

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-6xl mx-auto" style={{ background: "transparent" }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
          <span className="text-accent-gold">SK BOUTIQUE</span> Admin
        </h1>
        <button
          onClick={handleLogout}
          className="text-xs px-4 h-9 rounded-xl transition-all"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            color: "var(--text-muted)",
          }}
        >
          <i className="fas fa-sign-out-alt ml-1.5" />
          تسجيل خروج
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div
          className="rounded-xl p-4 text-center glass-card"
        >
          <div className="text-2xl font-bold" style={{ color: "var(--accent-gold)" }}>{allProducts.length}</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>عدد الملابس</div>
        </div>
        <div
          className="rounded-xl p-4 text-center glass-card"
        >
          <div className="text-2xl font-bold" style={{ color: "var(--accent-gold)" }}>{allPerfumes.length}</div>
          <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>عدد العطور</div>
        </div>
        <div
          className="rounded-xl p-4 text-center glass-card"
        >
          <div className="text-xs font-medium truncate" style={{ color: "var(--accent-gold)" }}>
            {lastAdded?.title || "-"}
          </div>
          <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
            {lastAdded?.createdAt || "آخر إضافة"}
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center mb-5 border-b" style={{ borderColor: "var(--border-color)" }}>
        {(["products", "perfumes"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="relative pb-3 text-sm font-medium transition-colors"
            style={{ color: tab === t ? "var(--accent-gold)" : "var(--text-muted)" }}
          >
            {t === "products" ? "الملابس" : "العطور"}
            {tab === t && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: "var(--accent-gold)" }}
              />
            )}
          </button>
        ))}
        <div className="mr-auto flex items-center gap-2">
          {(["all", "available", "unavailable", "featured"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] px-2.5 h-7 rounded-lg font-medium transition-all ${
                filter === f ? "bg-accent-gold/20 text-accent-gold border border-accent-gold/30" : "text-accent-gold/40 border border-transparent hover:text-accent-gold/60"
              }`}
            >
              {f === "all" ? "الكل" : f === "available" ? "متوفر" : f === "unavailable" ? "غير متوفر" : "مميز"}
            </button>
          ))}
        </div>
        <Link
          href={tab === "products" ? "/admin/products/new" : "/admin/perfumes/new"}
          className="text-xs h-9 px-4 rounded-xl font-medium flex items-center gap-1.5 transition-all"
          style={{
            background: "var(--accent-gold)",
            color: "var(--text-on-accent)",
          }}
        >
          <i className="fas fa-plus text-[10px]" />
          إضافة جديد
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(tab === "products" ? sortedProducts : sortedPerfumes)
          .filter((item) => {
            if (filter === "available") return item.inStock;
            if (filter === "unavailable") return !item.inStock;
            if (filter === "featured") return (item as any).featured === true;
            return true;
          })
          .map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`rounded-xl overflow-hidden transition-all glass-card ${!item.inStock ? "opacity-60" : ""}`}
          >
            <div className="aspect-[4/3] relative" style={{ background: "var(--bg-secondary)" }}>
              {!item.inStock && (
                <div className="absolute inset-0 z-10 bg-black/60 flex items-center justify-center">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/80 text-white">غير متوفر</span>
                </div>
              )}
              {item.inStock && (item as any).featured && (
                <span className="absolute top-2 right-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold border border-accent-gold/30 backdrop-blur-sm flex items-center gap-1">
                  <i className="fas fa-star text-[8px]" />
                  مميز
                </span>
              )}
              {"image" in item ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              ) : item.colors[0]?.images[0] ? (
                <img
                  src={item.colors[0].images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl" style={{ color: "#333" }}>
                  <i className="fas fa-tshirt" />
                </div>
              )}
            </div>
            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium truncate flex-1" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                {item.inStock ? (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20 whitespace-nowrap">
                    🟢 متوفر
                  </span>
                ) : (
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20 whitespace-nowrap">
                    🔴 غير متوفر
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--accent-gold)" }}>{item.basePrice} د.أ</span>
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                  {"sizes" in item ? item.sizes.join(" · ") : item.volume}
                </span>
              </div>
              <div className="flex gap-2 pt-1">
                <Link
                  href={tab === "products" ? `/admin/products/${item.id}/edit` : `/admin/perfumes/${item.id}/edit`}
                  className="flex-1 h-9 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                  style={{
                    background: "var(--accent-gold-muted)",
                    border: "1px solid var(--accent-gold/0.3)",
                    color: "var(--accent-gold)",
                  }}
                >
                  <i className="fas fa-pen text-[10px]" />
                  تعديل
                </Link>
                <button
                  onClick={() => setDeleteTarget({ type: tab, id: item.id, name: item.title })}
                  className="flex-1 h-9 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                  style={{
                    background: "rgba(255,68,68,0.08)",
                    border: "1px solid rgba(255,68,68,0.15)",
                    color: "#ff6666",
                  }}
                >
                  <i className="fas fa-trash text-[10px]" />
                  حذف
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ConfirmModal
        open={deleteTarget !== null}
        title={deleteTarget ? `حذف ${deleteTarget.name}` : ""}
        message="هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذا الإجراء."
        confirmLabel={deleting ? "جاري الحذف..." : "تأكيد الحذف"}
        confirmRed
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
