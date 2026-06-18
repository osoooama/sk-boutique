"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/components/Toast/ToastContext";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { products } from "@/lib/products";
import { perfumes } from "@/lib/perfumes";
import { deleteProduct, deletePerfume } from "@/lib/products-api";

type Tab = "products" | "perfumes";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [tab, setTab] = useState<Tab>("products");
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
    addToast("info", "تم تسجيل الخروج");
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
      addToast("success", `تم حذف ${deleteTarget.name}`);
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      addToast("error", "فشل الحذف: " + (err instanceof Error ? err.message : "خطأ غير معروف"));
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const sortedPerfumes = [...perfumes].sort(
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
        <h1 className="text-lg font-bold" style={{ color: "#F5F5F0" }}>
          <span className="text-accent-gold">SK BOUTIQUE</span> Admin
        </h1>
        <button
          onClick={handleLogout}
          className="text-xs px-4 h-9 rounded-xl transition-all"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#A8A89A",
          }}
        >
          <i className="fas fa-sign-out-alt ml-1.5" />
          تسجيل خروج
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div
          className="rounded-xl p-4 text-center"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}
        >
          <div className="text-2xl font-bold" style={{ color: "#C9A84C" }}>{products.length}</div>
          <div className="text-xs mt-1" style={{ color: "#6B6B5F" }}>عدد الملابس</div>
        </div>
        <div
          className="rounded-xl p-4 text-center"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}
        >
          <div className="text-2xl font-bold" style={{ color: "#C9A84C" }}>{perfumes.length}</div>
          <div className="text-xs mt-1" style={{ color: "#6B6B5F" }}>عدد العطور</div>
        </div>
        <div
          className="rounded-xl p-4 text-center"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)" }}
        >
          <div className="text-xs font-medium truncate" style={{ color: "#C9A84C" }}>
            {lastAdded?.title || "-"}
          </div>
          <div className="text-[10px] mt-0.5" style={{ color: "#6B6B5F" }}>
            {lastAdded?.createdAt || "آخر إضافة"}
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center mb-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        {(["products", "perfumes"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="relative pb-3 text-sm font-medium transition-colors"
            style={{ color: tab === t ? "#C9A84C" : "#6B6B5F" }}
          >
            {t === "products" ? "الملابس" : "العطور"}
            {tab === t && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: "#C9A84C" }}
              />
            )}
          </button>
        ))}
        <Link
          href={tab === "products" ? "/admin/products/new" : "/admin/perfumes/new"}
          className="mr-auto text-xs h-9 px-4 rounded-xl font-medium flex items-center gap-1.5 transition-all"
          style={{
            background: "linear-gradient(135deg, #C9A84C, #D4B87A)",
            color: "#0A0A0A",
          }}
        >
          <i className="fas fa-plus text-[10px]" />
          إضافة جديد
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(tab === "products" ? sortedProducts : sortedPerfumes).map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-xl overflow-hidden transition-all"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="aspect-[4/3] relative" style={{ background: "#111" }}>
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
              <h3 className="text-sm font-medium truncate" style={{ color: "#F5F5F0" }}>{item.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "#C9A84C" }}>{item.basePrice} د.أ</span>
                <span className="text-[10px]" style={{ color: "#6B6B5F" }}>
                  {"sizes" in item ? item.sizes.join(" · ") : item.volume}
                </span>
              </div>
              <div className="flex gap-2 pt-1">
                <Link
                  href={tab === "products" ? `/admin/products/${item.id}/edit` : `/admin/perfumes/${item.id}/edit`}
                  className="flex-1 h-9 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                  style={{
                    background: "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    color: "#C9A84C",
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
