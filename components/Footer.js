"use client";

import Image from "next/image";

export default function Footer({ isEnglish }) {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(isEnglish ? "Your email has been registered! We will send you offers first." : "تم تسجيل بريدك الإلكتروني! سنرسل لك العروض أولاً.");
    e.target.reset();
  };

  return (
    <footer id="contact" className="bg-[var(--bg-tertiary)] border-t border-[var(--border-subtle)] pt-16 pb-24 md:pb-12 text-[var(--text-muted)] text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-4">
            <a href="#" className="flex items-center gap-2 select-none">
              <Image src="/assets/logo_gold.png" alt="SK Logo" width={28} height={28} className="w-7 h-7 object-contain" />
              <span className="text-lg font-bold text-gold tracking-wider font-cinzel">BOUTIQUE</span>
            </a>
            <p className="text-[var(--text-muted)] font-light leading-relaxed max-w-xs">
              {isEnglish
                ? "A contemporary Jordanian fashion house offering global luxury with handmade touches and embroidery inspired by national identity and the Jordanian Shemagh."
                : "بيت أزياء أردني معاصر يقدم الفخامة العالمية بلمسات وتطاريز يدوية مستوحاة من الهوية الوطنية والشماغ الأردني."}
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/sk_boutique977/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] hover:bg-gold hover:text-black transition-all duration-300 flex items-center justify-center text-sm" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] hover:bg-gold hover:text-black transition-all duration-300 flex items-center justify-center text-sm" aria-label="TikTok">
                <i className="fab fa-tiktok" />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=962798921123&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] hover:bg-gold hover:text-black transition-all duration-300 flex items-center justify-center text-sm" aria-label="WhatsApp">
                <i className="fab fa-whatsapp" />
              </a>
            </div>
            <div className="text-[var(--text-dim)] text-xs space-y-1">
              <p className="flex items-center gap-2"><i className="fas fa-phone text-gold/60 w-3" /> +962 7 9892 1123</p>
              <p className="flex items-center gap-2"><i className="fas fa-envelope text-gold/60 w-3" /> sk_boutique977@outlook.com</p>
              <p className="flex items-center gap-2"><i className="fas fa-map-marker-alt text-gold/60 w-3" /> {isEnglish ? "Amman, Jordan" : "عمّان، الأردن"}</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
              {isEnglish ? "Links" : "روابط"}
            </h3>
            <ul className="space-y-2 text-[var(--text-muted)]">
              <li><a href="#catalog" className="hover:text-[var(--text-primary)] transition">{isEnglish ? "Current Collection" : "المجموعة الحالية"}</a></li>
              <li><a href="#about" className="hover:text-[var(--text-primary)] transition">{isEnglish ? "Identity & Heritage" : "الهوية والتراث"}</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition">{isEnglish ? "Privacy Policy" : "سياسة الخصوصية"}</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition">{isEnglish ? "Terms & Conditions" : "الشروط والأحكام"}</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
              {isEnglish ? "Customer Service" : "خدمة العملاء"}
            </h3>
            <ul className="space-y-2 text-[var(--text-muted)]">
              <li><a href="#" className="hover:text-[var(--text-primary)] transition">{isEnglish ? "Nationwide Shipping" : "الشحن لكل المحافظات"}</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition">{isEnglish ? "Returns & Sizing" : "سياسة الاسترجاع والقياس"}</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition">{isEnglish ? "Size Guide" : "جدول المقاسات"}</a></li>
              <li><a href="#" className="hover:text-[var(--text-primary)] transition">{isEnglish ? "Track Your Order" : "تتبع طلبيتك"}</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
              {isEnglish ? "Newsletter" : "النشرة البريدية"}
            </h3>
            <p className="text-[var(--text-dim)] text-xs">{isEnglish ? "Be the first to know about new collections and exclusive offers." : "كوني أول من يعرف عن المجموعات الجديدة والعروض الحصرية."}</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                required
                placeholder={isEnglish ? "Your Email" : "بريدك الإلكتروني"}
                className="bg-[var(--bg-subtle)] border border-[var(--border-light)] rounded-xl px-3 py-2.5 text-xs text-[var(--text-primary)] outline-none focus:border-gold/30 w-full transition-all duration-300"
              />
              <button type="submit" className="px-3.5 py-2.5 bg-gold text-black rounded-xl text-xs font-bold transition-all duration-300 shrink-0 hover:bg-gold/90 active:scale-95">
                <i className="fas fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-light)] to-transparent" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--text-dim)] text-xs">
          <p className="flex items-center justify-center gap-1 flex-wrap">
            <span>© 2026</span>
            <span className="inline-flex items-center gap-1 mx-1">
              <Image src="/assets/logo_gold.png" alt="SK Logo" width={14} height={14} className="w-3.5 h-3.5 object-contain inline" />
              <span className="text-gold font-bold font-cinzel text-[10px] tracking-wider">BOUTIQUE</span>
            </span>
            <span>{isEnglish ? "— Sara Krishan Store Jordan. All rights reserved." : "— متجر سارة كريشان الأردن. جميع الحقوق محفوظة."}</span>
          </p>
          <div className="flex items-center gap-3 text-base">
            <i className="fab fa-cc-visa text-[var(--text-muted)]" title="Visa" />
            <i className="fab fa-cc-mastercard text-[var(--text-muted)]" title="MasterCard" />
            <span className="text-[10px] font-bold border border-[var(--text-dim)] rounded px-1.5 py-0.5">COD</span>
            <span className="text-[10px] font-bold border border-[var(--text-dim)] rounded px-1.5 py-0.5 flex items-center gap-1">
              <span className="text-base leading-none">🇯🇴</span> {isEnglish ? "Jordan" : "الأردن"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
