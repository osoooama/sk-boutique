"use client";

import Image from "next/image";

export default function WelcomeSplash({ visible, isEnglish, onEnter }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 animate-fade-in">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-56 h-56 mx-auto rounded-3xl overflow-hidden color-cycle-gradient p-1.5 shadow-2xl border border-[var(--border-light)] group relative">
          <div className="absolute inset-0 bg-black/40 blur-xl opacity-50 group-hover:opacity-80 transition duration-500" />
          <div className="w-full h-full bg-[var(--bg-primary)] rounded-2xl flex items-center justify-center p-6 relative">
            <Image
              src="/assets/logo_gold.png"
              alt="SK BOUTIQUE Logo"
              width={200}
              height={200}
              className="w-full h-full object-contain color-cycle-logo filter drop-shadow-[0_0_10px_rgba(207,168,80,0.3)]"
            />
          </div>
        </div>
        <div className="space-y-2 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-wide font-cinzel">
            <Image src="/assets/logo_gold.png" alt="SK Logo" width={36} height={36} className="w-9 h-9 object-contain color-cycle-logo" />
            <span className="text-gold">BOUTIQUE</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {isEnglish ? "Welcome" : "أهلاً وسهلاً"}
          </h1>
          <h2 className="text-lg text-gold font-medium">
            {isEnglish ? "Sara Krishan Boutique" : "متجر سارة كريشان"}
          </h2>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-[var(--border-light)] text-gold px-4 py-1.5 rounded-full text-xs font-bold font-cairo tracking-wide my-1 select-none">
            <i className="fas fa-history text-[10px] text-gold/80 animate-spin-slow" />
            <span>{isEnglish ? "SK with you since 2021" : "SK معكم منذ 2021"}</span>
          </div>
          <p className="text-sm text-[var(--text-muted)] font-light">
            {isEnglish
              ? "Modern European designs, locally crafted with EU quality standards"
              : "تصاميم أوروبية عصرية، تُصنع محلياً بمعايير الجودة الأوروبية"}
          </p>
        </div>

        <div className="h-px bg-[var(--border-subtle)] w-32 mx-auto" />

        <button
          onClick={onEnter}
          className="w-full py-4 bg-gold hover:bg-gold/90 text-black font-semibold rounded-xl transition duration-300 transform active:scale-95 shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
        >
          <i className="fas fa-door-open" /> {isEnglish ? "Enter & Shop Now" : "ادخل وتسوق الآن"}
        </button>
        <p className="text-xs text-[var(--text-dim)]">
          {isEnglish ? (
            <>Use code <span className="font-bold text-gold">NASHAMA</span> for 15% off — support our national team! 🇯🇴</>
          ) : (
            <>استخدم كود <span className="font-bold text-gold">NASHAMA</span> خصم 15% دعماً للمنتخب الوطني! 🇯🇴</>
          )}
        </p>
      </div>
    </div>
  );
}
