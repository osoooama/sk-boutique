"use client";

import Link from "next/link";
import Logo from "./Logo";

interface FooterProps {
  isEnglish: boolean;
}

export default function Footer({ isEnglish }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative pt-16 pb-8 border-t border-white/5 bg-luxury-black">
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-gold/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-4 space-y-4">
            <Logo showText size="sm" />
            <p className="text-sm font-light leading-relaxed max-w-xs text-luxury-gold/40">
              {isEnglish
                ? "A contemporary fashion house blending modern European design with local craftsmanship."
                : "بيت أزياء معاصر يجمع بين التصميم الأوروبي الحديث والصناعة المحلية الحرفية."}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/sk_boutique977/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-luxury-gold hover:bg-luxury-gold/10 hover:border-luxury-gold/30 transition-all"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=962798921123"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-luxury-gold hover:bg-luxury-gold/10 hover:border-luxury-gold/30 transition-all"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp" />
              </a>
              <a
                href="mailto:sk_boutique977@outlook.com"
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-luxury-gold hover:bg-luxury-gold/10 hover:border-luxury-gold/30 transition-all"
                aria-label="Email"
              >
                <i className="fas fa-envelope" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-luxury-white tracking-wider uppercase">
              {isEnglish ? "Links" : "روابط"}
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", ar: "الرئيسية", en: "Home" },
                { href: "/shop", ar: "الملابس", en: "Clothing" },
                { href: "/perfumes", ar: "العطور", en: "Perfumes" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-luxury-gold/40 hover:text-luxury-gold transition-colors duration-300"
                    style={{ textDecoration: "none" }}
                  >
                    {isEnglish ? link.en : link.ar}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-luxury-white tracking-wider uppercase">
              {isEnglish ? "Customer Service" : "خدمة العملاء"}
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { ar: "شحن مجاني لكل الأردن", en: "Free shipping across Jordan" },
                { ar: "الدفع عند الاستلام", en: "Cash on delivery" },
                { ar: "إرجاع مجاني خلال 7 أيام", en: "7-day free returns" },
                { ar: "خامات إيطالية وفرنسية", en: "Italian & French materials" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-luxury-gold/40">
                  <i className="fas fa-check text-luxury-gold/60 text-[8px]" />
                  {isEnglish ? item.en : item.ar}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-luxury-white tracking-wider uppercase">
              {isEnglish ? "Contact" : "معلومات الاتصال"}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-luxury-gold/40">
                <i className="fas fa-phone text-luxury-gold/60 w-4 text-center" />
                +962 7 9892 1123
              </li>
              <li className="flex items-center gap-2 text-luxury-gold/40">
                <i className="fas fa-envelope text-luxury-gold/60 w-4 text-center" />
                sk_boutique977@outlook.com
              </li>
              <li className="flex items-center gap-2 text-luxury-gold/40">
                <i className="fas fa-map-marker-alt text-luxury-gold/60 w-4 text-center" />
                {isEnglish ? "Amman, Jordan" : "عمّان، الأردن"}
              </li>
              <li className="flex items-center gap-2 text-luxury-gold/40">
                <i className="fab fa-instagram text-luxury-gold/60 w-4 text-center" />
                @sk_boutique977
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-luxury-gold/40">
          <p>
            &copy; {currentYear} SK BOUTIQUE —{" "}
            {isEnglish ? "All rights reserved" : "جميع الحقوق محفوظة"}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold px-2.5 py-1 border border-white/10 rounded-full">
              COD
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 border border-luxury-gold/30 text-luxury-gold rounded-full">
              EU Quality
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 border border-white/10 rounded-full">
              JO
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
