"use client";

export default function ToastNotifications({ toasts }) {
  return (
    <div className="fixed bottom-20 md:bottom-6 left-6 z-[9990] flex flex-col gap-3 max-w-sm w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-animation flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-xl backdrop-blur-md border text-sm text-white ${
            t.type === "success"
              ? "bg-[#1c3d27]/95 border-[#2b683d]"
              : t.type === "danger"
              ? "bg-[#3d1c1c]/95 border-[#682b2b]"
              : "bg-black/90 border-[#cfa850]/20"
          }`}
        >
          <i
            className={`fas ${
              t.type === "success"
                ? "fa-check-circle text-emerald-400"
                : t.type === "danger"
                ? "fa-exclamation-circle text-red-400"
                : "fa-info-circle text-gold"
            }`}
          />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
