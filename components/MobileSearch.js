"use client";

import { useEffect, useRef } from "react";

export default function MobileSearch({ isOpen, isEnglish, searchQuery, onSearchChange, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[5000] bg-[var(--bg-primary)]/95 backdrop-blur-md flex flex-col p-6 pt-16 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-[var(--bg-subtle-hover)] border border-[var(--border-light)] rounded-full px-5 py-3.5 flex items-center gap-3 focus-within:border-gold/30 transition-all duration-300">
          <i className="fas fa-search text-[var(--text-muted)]" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={isEnglish ? "Search for items..." : "ابحث عن قطعة..."}
            className="bg-transparent border-none outline-none text-sm text-[var(--text-primary)] w-full"
          />
        </div>
        <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xl p-2 active:scale-90 transition-all duration-300">
          <i className="fas fa-times" />
        </button>
      </div>
      <p className="text-xs text-[var(--text-dim)] text-center font-light">
        {isEnglish ? "Type item name or category for instant search..." : "اكتب اسم القطعة أو نوعها للبحث الفوري..."}
      </p>
    </div>
  );
}
