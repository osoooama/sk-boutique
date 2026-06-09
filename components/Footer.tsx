"use client";

import Image from "next/image";

interface FooterProps {
  isEnglish: boolean;
  onNewsletterSubscribe?: (email: string) => void;
}

export default function Footer({ isEnglish, onNewsletterSubscribe }: FooterProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email") as string;
    if (email && onNewsletterSubscribe) onNewsletterSubscribe(email);
    e.currentTarget.reset();
  };

  return (
    <footer
      id="contact"
      className="pt-16 pb-24 md:pb-12 text-xs md:text-sm border-t"
      style={{
        background: "var(--bg-tertiary)",
        borderColor: "var(--border-subtle)",
        color: "var(--text-muted)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <a href="#hero" className="flex items-center gap-2 select-none" style={{ textDecoration: "none" }}>
              <Image src="/assets/logo_gold.png" alt="SK Logo" width={28} height={28} className="w-7 h-7 object-contain" />
              <span className="text-lg font-bold text-gold tracking-wider font-cinzel">BOUTIQUE</span>
            </a>
            <p className="font-light leading-relaxed max-w-xs" style={{ color: "var(--text-muted)" }}>
              {isEnglish
                ? "A contemporary fashion house blending modern European design with local craftsmanship. Premium imported fabrics from Italy and France, handcrafted to EU quality standards."
                : "بيت أزياء معاصر يجمع بين التصميم الأوروبي الحديث والصناعة المحلية الحرفية. أقمشة مستوردة فاخرة من إيطاليا وفرنسا، تُصنع يدوياً بمعايير الجودة الأوروبية."}
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/sk_boutique977/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 active:scale-90 min-touch-target border"
                style={{
                  background: "var(--bg-subtle)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-muted)",
                }}
                aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="#hero"
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 active:scale-90 min-touch-target border"
                style={{
                  background: "var(--bg-subtle)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-muted)",
                }}
                aria-label="TikTok">
                <i className="fab fa-tiktok" />
              </a>
              <a href="https://api.whatsapp.com/send/?phone=962798921123&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 active:scale-90 min-touch-target border"
                style={{
                  background: "var(--bg-subtle)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-muted)",
                }}
                aria-label="WhatsApp">
                <i className="fab fa-whatsapp" />
              </a>
            </div>
            <div className="text-xs space-y-1.5" style={{ color: "var(--text-dim)" }}>
              <p className="flex items-center gap-2"><i className="fas fa-phone w-3" style={{ color: "var(--gold)" }} /> +962 7 9892 1123</p>
              <p className="flex items-center gap-2"><i className="fas fa-envelope w-3" style={{ color: "var(--gold)" }} /> sk_boutique977@outlook.com</p>
              <p className="flex items-center gap-2"><i className="fas fa-map-marker-alt w-3" style={{ color: "var(--gold)" }} /> {isEnglish ? "Amman, Jordan" : "عمّان، الأردن"}</p>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              {isEnglish ? "Links" : "روابط"}
            </h3>
            <ul className="space-y-2 text-xs" style={{ color: "var(--text-muted)" }}>
              <li><a href="#catalog" className="inline-block py-1.5 hover:text-gold transition min-touch-target">{isEnglish ? "Current Collection" : "المجموعة الحالية"}</a></li>
              <li><a href="#about" className="inline-block py-1.5 hover:text-gold transition min-touch-target">{isEnglish ? "Identity & Heritage" : "الهوية والتراث"}</a></li>
              <li><a href="#hero" className="inline-block py-1.5 hover:text-gold transition min-touch-target">{isEnglish ? "Privacy Policy" : "سياسة الخصوصية"}</a></li>
              <li><a href="#hero" className="inline-block py-1.5 hover:text-gold transition min-touch-target">{isEnglish ? "Terms & Conditions" : "الشروط والأحكام"}</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              {isEnglish ? "Customer Service" : "خدمة العملاء"}
            </h3>
            <ul className="space-y-2 text-xs" style={{ color: "var(--text-muted)" }}>
              <li><a href="#hero" className="inline-block py-1.5 hover:text-gold transition min-touch-target">{isEnglish ? "Nationwide Shipping" : "الشحن لكل المحافظات"}</a></li>
              <li><a href="#hero" className="inline-block py-1.5 hover:text-gold transition min-touch-target">{isEnglish ? "Returns & Sizing" : "سياسة الاسترجاع والقياس"}</a></li>
              <li><a href="#hero" className="inline-block py-1.5 hover:text-gold transition min-touch-target">{isEnglish ? "Size Guide" : "جدول المقاسات"}</a></li>
              <li><a href="#hero" className="inline-block py-1.5 hover:text-gold transition min-touch-target">{isEnglish ? "Track Your Order" : "تتبع طلبيتك"}</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
              {isEnglish ? "Newsletter" : "النشرة البريدية"}
            </h3>
            <p className="text-xs" style={{ color: "var(--text-dim)" }}>
              {isEnglish ? "Be the first to know about new collections and exclusive offers." : "كوني أول من يعرف عن المجموعات الجديدة والعروض الحصرية."}
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                name="email"
                required
                placeholder={isEnglish ? "Your Email" : "بريدك الإلكتروني"}
                className="flex-1 rounded-xl px-3 py-2.5 text-xs outline-none border transition-all duration-300"
                style={{
                  background: "var(--bg-subtle)",
                  borderColor: "var(--border-light)",
                  color: "var(--text-primary)",
                }}
              />
              <button
                type="submit"
                className="px-4 py-3 bg-gold text-black rounded-xl text-xs font-bold transition-all duration-300 shrink-0 active:scale-95 min-touch-target hover:bg-gold/90"
              >
                <i className="fas fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, var(--border-light), transparent)" }} />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: "var(--text-dim)" }}>
          <p className="flex items-center justify-center gap-1 flex-wrap text-center">
            <span>&copy; 2026</span>
            <Image src="/assets/logo_gold.png" alt="SK Logo" width={14} height={14} className="w-3.5 h-3.5 object-contain inline" />
            <span className="text-gold font-bold font-cinzel text-[10px] tracking-wider">BOUTIQUE</span>
            <span>{isEnglish ? "Sara Krishan Store Jordan. All rights reserved." : "متجر سارة كريشان الأردن. جميع الحقوق محفوظة."}</span>
          </p>
          <p className="text-[9px] tracking-[0.3em] uppercase font-playfair font-light" style={{ color: "rgba(201, 168, 76, 0.3)" }}>
            {isEnglish ? "Under the Supervision of Osama Krishan" : "تحت إشراف أسامة كريشان"}
          </p>
          <div className="flex items-center gap-3 text-base">
            <i className="fab fa-cc-visa" style={{ color: "var(--text-muted)" }} title="Visa" />
            <i className="fab fa-cc-mastercard" style={{ color: "var(--text-muted)" }} title="MasterCard" />
            <span className="text-[10px] font-bold rounded px-1.5 py-0.5 border" style={{ borderColor: "var(--text-dim)" }}>COD</span>
            <span className="text-[10px] font-bold rounded px-1.5 py-0.5 flex items-center gap-1" style={{ borderColor: "rgba(201, 168, 76, 0.4)", color: "var(--gold)" }}>
              <span className="text-xs">🇪🇺</span> CE
            </span>
            <span className="text-[10px] font-bold rounded px-1.5 py-0.5 flex items-center gap-1 border" style={{ borderColor: "var(--text-dim)" }}>
              <span className="text-base leading-none">🇯🇴</span> {isEnglish ? "Jordan" : "الأردن"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
