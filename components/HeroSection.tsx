"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import useMouseTracking from "@/hooks/useMouseTracking";

interface HeroSectionProps {
  isEnglish: boolean;
}

const t = (key: string, isEnglish: boolean): string => {
  const dict: Record<string, Record<string, string>> = {
    ar: {
      badge: "تصميم أوروبي · صناعة محلية",
      headline1: "أناقة عصرية",
      headline2: "بخامات إيطالية ومعايير أوروبية",
      desc: "تشكيلة حصرية بتصاميم أوروبية عصرية، تُصنع محلياً بأيدٍ ماهرة وبأفضل الخامات المستوردة — لكل من يعتز بالأناقة والجودة.",
      explore: "استكشف التشكيلة",
      story: "هويتنا",
      promoTitle: "جودة أوروبية",
      promoSub: "صناعة محلية 🇪🇺",
      promoDesc: "على جميع القطع المصنعة محلياً بمعايير الاتحاد الأوروبي",
      promoClick: "انقر لتفعيل الخصم تلقائياً",
    },
    en: {
      badge: "European Design · Locally Crafted",
      headline1: "Modern Elegance",
      headline2: "With Italian Fabrics & EU Standards",
      desc: "An exclusive collection of modern European designs, locally handcrafted by skilled artisans using premium imported materials — for those who cherish elegance and quality.",
      explore: "Explore Collection",
      story: "Our Identity",
      promoTitle: "EU Quality",
      promoSub: "Locally Made 🇪🇺",
      promoDesc: "On all locally crafted pieces meeting EU quality standards",
      promoClick: "Click to apply discount automatically",
    },
  };
  return dict[isEnglish ? "en" : "ar"][key] || key;
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function HeroSection({ isEnglish }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const mouse = useMouseTracking();
  const { scrollY } = useScroll();
  const [parallaxY, setParallaxY] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setParallaxY(Math.min(latest * 0.3, 180));
  });

  const glowX = mouse.x * 100;
  const glowY = mouse.y * 100;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* ─── Background Image + Parallax ─── */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <Image
          src="/assets/sk.png"
          alt="SK BOUTIQUE"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center opacity-40 brightness-50 scale-110"
        />
      </div>

      {/* ─── Aurora Gradients ─── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(201, 168, 76, 0.08) 0%, transparent 60%), " +
            "radial-gradient(ellipse 60% 40% at 80% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 50%), " +
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(30, 64, 175, 0.05) 0%, transparent 50%)",
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 50%",
          animation: "aurora 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 60% 20%, rgba(201, 168, 76, 0.05) 0%, transparent 50%), " +
            "radial-gradient(ellipse 60% 50% at 30% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 50%)",
          backgroundSize: "150% 150%",
          backgroundPosition: "100% 0%",
          animation: "aurora 18s ease-in-out infinite alternate",
        }}
      />

      {/* ─── Mouse Tracking Glow ─── */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none transition-opacity duration-1000 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(201, 168, 76, 0.08) 0%, transparent 60%)`,
        }}
      />

      {/* ─── Floating Decorative Blobs ─── */}
      <div
        className="absolute z-[2] pointer-events-none"
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201, 168, 76, 0.06) 0%, transparent 70%)",
          top: "15%",
          left: "10%",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute z-[2] pointer-events-none"
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)",
          bottom: "20%",
          right: "15%",
          animation: "float 12s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute z-[2] pointer-events-none"
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          border: "1px solid rgba(201, 168, 76, 0.08)",
          top: "60%",
          left: "60%",
          animation: "float 10s ease-in-out infinite 2s",
        }}
      />
      <div
        className="absolute z-[2] pointer-events-none"
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          border: "1px solid rgba(139, 92, 246, 0.08)",
          top: "25%",
          right: "25%",
          animation: "float 7s ease-in-out infinite 1s",
        }}
      />

      {/* ─── Gradient Overlays ─── */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]/60 pointer-events-none" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-[var(--bg-primary)]/30 via-transparent to-transparent pointer-events-none" />

      {/* ─── Content ─── */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        animate={shouldReduceMotion ? undefined : "show"}
      >
        {/* Text Side */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-1.5 rounded-full text-[11px] md:text-xs font-semibold uppercase tracking-wide border border-gold/15 backdrop-blur-sm">
              <i className="fas fa-sparkles text-[10px]" />
              {t("badge", isEnglish)}
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`text-4xl md:text-6xl lg:text-7xl leading-tight font-bold ${
              isEnglish ? "font-playfair" : "font-noto"
            }`}
            style={{ color: isEnglish ? "var(--text-primary)" : "var(--text-primary)" }}
          >
            {t("headline1", isEnglish)}{" "}
            <br />
            <span className="text-gold bg-gradient-to-r from-gold via-[var(--champagne,var(--gold-light))] to-gold bg-clip-text text-transparent">
              {t("headline2", isEnglish)}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[var(--text-secondary)] text-sm md:text-base max-w-xl mx-auto lg:mx-0 font-light leading-relaxed font-inter"
          >
            {t("desc", isEnglish)}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4"
          >
            <a
              href="#catalog"
              className="relative group w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 min-touch-target overflow-hidden bg-gradient-to-r from-gold via-[var(--gold-light,var(--gold))] to-gold text-black transition-all duration-300"
              style={{
                boxShadow: "0 4px 20px rgba(201, 168, 76, 0.25)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 30px rgba(201, 168, 76, 0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(201, 168, 76, 0.25)"; }}
            >
              <span className="relative z-10">{t("explore", isEnglish)}</span>
              <i className={`relative z-10 fas ${isEnglish ? "fa-arrow-right" : "fa-arrow-left"} text-xs`} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </a>

            <a
              href="#about"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-medium flex items-center justify-center active:scale-95 min-touch-target transition-all duration-300 backdrop-blur-sm text-gold"
              style={{
                background: "var(--bg-subtle)",
                border: "1px solid var(--border-light)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--bg-subtle-hover)";
                el.style.borderColor = "rgba(201, 168, 76, 0.3)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--bg-subtle)";
                el.style.borderColor = "var(--border-light)";
              }}
            >
              {t("story", isEnglish)}
            </a>
          </motion.div>
        </div>

        {/* Discount Card Side */}
        <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center">
          <div
            className="relative w-full max-w-sm rounded-3xl p-6 shadow-2xl overflow-hidden group backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, var(--bg-secondary), var(--bg-elevated))",
              border: "1px solid var(--border-light)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gold"
                  style={{
                    background: "rgba(201, 168, 76, 0.1)",
                    border: "1px solid rgba(201, 168, 76, 0.2)",
                  }}
                >
                  <i className="fas fa-gift text-lg" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
                    {t("promoTitle", isEnglish)}
                  </h3>
                  <p className="text-xs" style={{ color: "var(--text-dim)" }}>
                    {t("promoSub", isEnglish)}
                  </p>
                </div>
              </div>

              <div
                className="h-px"
                style={{
                  background: "linear-gradient(90deg, var(--border-subtle), rgba(201, 168, 76, 0.2), var(--border-subtle))",
                }}
              />

              <div className="space-y-1">
                <div
                  className="text-3xl font-extrabold flex items-baseline gap-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {isEnglish ? (
                    <>10% <span className="text-gold text-lg">Instant Discount</span></>
                  ) : (
                    <>10% <span className="text-gold text-lg">خصم فوري</span></>
                  )}
                </div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {t("promoDesc", isEnglish)}
                </p>
              </div>

              <div
                className="rounded-2xl p-4 text-center space-y-2 transition-colors duration-300 group-hover:bg-opacity-80"
                style={{
                  background: "rgba(201, 168, 76, 0.05)",
                  border: "1px solid rgba(201, 168, 76, 0.1)",
                }}
              >
                <span
                  className="text-[10px] block"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t("promoClick", isEnglish)}
                </span>
                <div
                  className="inline-block rounded-lg px-4 py-2 text-gold font-mono font-bold tracking-widest text-lg transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <span className="relative z-10">SK10</span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(201, 168, 76, 0.08) 50%, transparent 100%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmer 2s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
