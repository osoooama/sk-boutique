"use client";

export default function WhatsAppButton({ isEnglish }) {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=962798921123&text&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-8 right-4 md:right-6 z-[9990] w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition duration-300 active:scale-95 group cursor-pointer pb-safe"
      aria-label={isEnglish ? "Contact us via WhatsApp" : "تواصل معنا عبر واتساب"}
    >
      <span className="absolute right-16 bottom-0 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs font-medium px-3.5 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg max-w-[180px] truncate">
        {isEnglish ? "Contact us directly" : "تواصل معنا مباشرة"}
      </span>
      <i className="fab fa-whatsapp text-2xl animate-pulse" />
    </a>
  );
}
