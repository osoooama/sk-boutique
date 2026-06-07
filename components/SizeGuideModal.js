"use client";

export default function SizeGuideModal({ isOpen, isEnglish, onClose }) {
  if (!isOpen) return null;

  const sizes = [
    { label: "S", bust: "88-92", waist: "68-72", hips: "94-98", length: "58-60" },
    { label: "M", bust: "93-97", waist: "73-77", hips: "99-103", length: "60-62" },
    { label: "L", bust: "98-102", waist: "78-82", hips: "104-108", length: "62-64" },
    { label: "XL", bust: "103-108", waist: "83-88", hips: "109-114", length: "64-66" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-3xl overflow-hidden shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[var(--text-primary)] font-cairo">
              {isEnglish ? "Size Guide" : "جدول المقاسات"}
            </h3>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-muted)] flex items-center justify-center transition min-touch-target active:scale-90">
              <i className="fas fa-times text-sm" />
            </button>
          </div>

          <p className="text-xs text-[var(--text-muted)] font-light mb-5">
            {isEnglish
              ? "Measurements in centimeters. If you are between sizes, we recommend choosing the larger size for a more comfortable fit."
              : "القياسات بالسنتيمتر. إذا كنتِ بين مقاسين، ننصح باختيار المقاس الأكبر للحصول على مقاس مريح."}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--border-subtle)]">
                  <th className="text-start py-3 font-bold text-[var(--text-primary)]">{isEnglish ? "Size" : "المقاس"}</th>
                  <th className="text-start py-3 font-bold text-[var(--text-primary)]">{isEnglish ? "Bust" : "الصدر"}</th>
                  <th className="text-start py-3 font-bold text-[var(--text-primary)]">{isEnglish ? "Waist" : "الخصر"}</th>
                  <th className="text-start py-3 font-bold text-[var(--text-primary)]">{isEnglish ? "Hips" : "الأرداف"}</th>
                  <th className="text-start py-3 font-bold text-[var(--text-primary)]">{isEnglish ? "Length" : "الطول"}</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.label} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="py-3 font-bold text-gold">{s.label}</td>
                    <td className="py-3 text-[var(--text-muted)]">{s.bust}</td>
                    <td className="py-3 text-[var(--text-muted)]">{s.waist}</td>
                    <td className="py-3 text-[var(--text-muted)]">{s.hips}</td>
                    <td className="py-3 text-[var(--text-muted)]">{s.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-2xl p-4 text-center">
            <p className="text-xs text-[var(--text-dim)] font-light">
              {isEnglish
                ? "Need help with sizing? Contact us on WhatsApp and we will assist you."
                : "تحتاجين مساعدة في المقاسات؟ تواصلي معنا على واتساب وسنساعدك."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
