"use client";

import Image from "next/image";

export default function HeroSection({ isEnglish, onApplyPromo }) {
  const t = (key) => {
    const TRANSLATIONS = {
      ar: {
        heroBadge: "تصميم أوروبي · صناعة محلية",
        heroTitle1: "أناقة عصرية",
        heroTitle2: "بخامات إيطالية ومعايير أوروبية",
        heroDesc: "تشكيلة حصرية بتصاميم أوروبية عصرية، تُصنع محلياً بأيدٍ ماهرة وبأفضل الخامات المستوردة — لكل من يعتز بالأناقة والجودة.",
        heroExplore: "استكشف التشكيلة",
        heroStory: "هويتنا",
        promoCardTitle: "جودة أوروبية",
        promoCardSubtitle: "صناعة محلية 🇪🇺",
        promoCardDesc: "على جميع القطع المصنعة محلياً بمعايير الاتحاد الأوروبي",
        promoCardClick: "انقر لتفعيل الخصم تلقائياً"
      },
      en: {
        heroBadge: "European Design · Locally Crafted",
        heroTitle1: "Modern Elegance",
        heroTitle2: "With Italian Fabrics & EU Standards",
        heroDesc: "An exclusive collection of modern European designs, locally handcrafted by skilled artisans using premium imported materials — for those who cherish elegance and quality.",
        heroExplore: "Explore Collection",
        heroStory: "Our Identity",
        promoCardTitle: "EU Quality",
        promoCardSubtitle: "Locally Made 🇪🇺",
        promoCardDesc: "On all locally crafted pieces meeting EU quality standards",
        promoCardClick: "Click to apply discount automatically"
      }
    };
    return TRANSLATIONS[isEnglish ? "en" : "ar"][key] || key;
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/sk.png"
          alt="SK BOUTIQUE — تصاميم أوروبية عصرية"
          fill
          sizes="100vw"
          preload
          className="object-cover object-center opacity-45 brightness-75 scale-105 transition duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#b53a2b]/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
          <div className="inline-flex items-center gap-2 bg-gold/15 text-gold px-4 py-1.5 rounded-full text-[11px] md:text-xs font-semibold uppercase tracking-wide border border-gold/20 animate-fade-in">
            <i className="fas fa-sparkles text-[10px]" /> {t("heroBadge")}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)] leading-tight font-cairo">
            {t("heroTitle1")} <br />
            <span className="text-gold tracking-wide bg-gradient-to-r from-gold via-desert-sand to-gold bg-clip-text text-transparent">{t("heroTitle2")}</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
            {t("heroDesc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4">
            <a
              href="#catalog"
              className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold/90 text-black font-semibold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-gold/10 flex items-center justify-center gap-2 active:scale-95"
            >
              {t("heroExplore")} <i className={`fas ${isEnglish ? "fa-arrow-right" : "fa-arrow-left"} text-xs`} />
            </a>
            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-4 bg-[var(--bg-subtle)] hover:bg-[var(--bg-subtle-hover)] text-[var(--text-primary)] font-medium rounded-xl text-sm border border-[var(--border-light)] transition-all duration-300 flex items-center justify-center active:scale-95"
            >
              {t("heroStory")}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div
            onClick={() => onApplyPromo("NASHAMA")}
            className="relative w-full max-w-sm bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-elevated)] border border-[#cfa850]/20 rounded-3xl p-6 shadow-2xl overflow-hidden group cursor-pointer transform hover:-translate-y-2 transition-all duration-500 active:scale-[0.98]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
              <div className="absolute top-3 -right-8 w-28 py-1.5 shemagh-pattern text-center text-[var(--text-primary)] text-[9px] font-bold uppercase tracking-wider rotate-45 border-b border-white/20 shadow-md">
                NASHAMA
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                  <i className="fas fa-gift text-lg" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-muted)]">{t("promoCardTitle")}</h3>
                  <p className="text-xs text-[var(--text-dim)]">{t("promoCardSubtitle")}</p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-[var(--border-subtle)] via-gold/20 to-[var(--border-subtle)]" />

              <div className="space-y-1">
                <div className="text-3xl font-extrabold text-[var(--text-primary)] flex items-baseline gap-1">
                  {isEnglish ? <>15% <span className="text-gold text-lg">Instant Discount</span></> : <>15% <span className="text-gold text-lg">خصم فوري</span></>}
                </div>
                <p className="text-xs text-[var(--text-muted)]">{t("promoCardDesc")}</p>
              </div>

              <div className="bg-gold/5 border border-gold/10 rounded-2xl p-4 text-center space-y-2 group-hover:bg-gold/10 transition-colors duration-300">
                <span className="text-[10px] text-[var(--text-muted)] block">{t("promoCardClick")}</span>
                <div className="inline-block bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-gold font-mono font-bold tracking-widest text-lg group-hover:border-gold/30 transition-all">
                  NASHAMA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
