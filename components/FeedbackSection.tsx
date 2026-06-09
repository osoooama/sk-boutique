"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface FeedbackSectionProps {
  isEnglish: boolean;
}

const DICT: Record<string, Record<string, string>> = {
  ar: {
    badge: "عائلة SK BOUTIQUE",
    title: "ماذا قالوا عنا؟",
    desc: "تصفح آراء ومحادثات زبائننا الكرام كصفحات كتاب يروي قصة فخرنا وثقتهم في تصاميمنا.",
    endTitle: "شكراً لثقتكم بنا",
    endDesc: "نكبر بكم وبآرائكم الغالية. نسعى دائماً لتقديم الأفضل لتكونوا فخورين بقطعكم الأنيقة من متجرنا.",
  },
  en: {
    badge: "SK BOUTIQUE Family",
    title: "What They Say About Us",
    desc: "Browse our valued customers' reviews and chats like pages of a book that tells the story of our pride and their trust in our designs.",
    endTitle: "Thank You for Your Trust",
    endDesc: "We grow through you and your valuable feedback. We always strive to provide the best so you can be proud of your elegant pieces.",
  },
};

const TOTAL = 17;

export default function FeedbackSection({ isEnglish }: FeedbackSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [page, setPage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const t = (key: string) => DICT[isEnglish ? "en" : "ar"][key] || key;

  const totalPages = Math.ceil((TOTAL + 1) / 2);

  const next = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages]);
  const prev = useCallback(() => setPage((p) => (p - 1 + totalPages) % totalPages), [totalPages]);

  useEffect(() => {
    if (!playing) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(next, 4000);
    return () => clearInterval(intervalRef.current);
  }, [playing, next]);

  const imgSrc = (idx: number) => `/assets/feedback-${idx}.webp`;

  return (
    <section
      id="feedback"
      className="py-20 border-b border-[var(--border-subtle)] relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
    >
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(201, 168, 76, 0.04)" }} />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(139, 92, 246, 0.03)" }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3"
        >
          <span className="inline-block bg-gold/10 text-gold px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-gold/15">
            {t("badge")}
          </span>
          <h2 className={`text-3xl md:text-4xl font-bold ${isEnglish ? "font-playfair" : "font-noto"}`} style={{ color: "var(--text-primary)" }}>
            {t("title")}
          </h2>
          <p className="text-sm max-w-xl mx-auto font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {t("desc")}
          </p>
        </motion.div>

        {/* Desktop Slider */}
        <div className="hidden md:block max-w-4xl mx-auto relative">
          <motion.div
            key={page}
            initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, x: -40 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[2rem] p-4 md:p-6 border backdrop-blur-sm"
            style={{
              background: "var(--bg-secondary)",
              borderColor: "var(--border-subtle)",
              boxShadow: "var(--shadow-strong)",
            }}
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Left card */}
              <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-elevated)" }}>
                <div className="absolute top-3 start-4 z-10 text-gold/30 text-4xl font-serif leading-none pointer-events-none" style={{ fontFamily: "Playfair Display" }}>&ldquo;</div>
                <div className="p-4 pt-8">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md" style={{ background: "var(--bg-tertiary)" }}>
                    <Image src={imgSrc(page * 2 + 1)} alt={`Review ${page * 2 + 1}`} fill sizes="400px" className="object-contain" />
                  </div>
                </div>
              </div>

              {/* Right card */}
              <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-elevated)" }}>
                <div className="absolute top-3 start-4 z-10 text-gold/30 text-4xl font-serif leading-none pointer-events-none" style={{ fontFamily: "Playfair Display" }}>&ldquo;</div>
                <div className="p-4 pt-8">
                  {page * 2 + 2 <= TOTAL ? (
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md" style={{ background: "var(--bg-tertiary)" }}>
                      <Image src={imgSrc(page * 2 + 2)} alt={`Review ${page * 2 + 2}`} fill sizes="400px" className="object-contain" />
                    </div>
                  ) : (
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden flex flex-col items-center justify-center text-center p-6 space-y-3 border" style={{ background: "var(--bg-primary)", borderColor: "rgba(201, 168, 76, 0.1)" }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-gold" style={{ background: "rgba(201, 168, 76, 0.08)", border: "1px solid rgba(201, 168, 76, 0.15)" }}>
                        <i className="fas fa-heart text-lg" />
                      </div>
                      <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{t("endTitle")}</h3>
                      <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{t("endDesc")}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full flex items-center justify-center border transition active:scale-90 min-touch-target"
              style={{
                background: "var(--bg-subtle)",
                borderColor: "var(--border-light)",
                color: "var(--text-primary)",
              }}
            >
              <i className={`fas ${isEnglish ? "fa-chevron-left" : "fa-chevron-right"} text-sm`} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === page ? "w-6 bg-gold" : "bg-[var(--text-dim)]/30 hover:bg-[var(--text-dim)]/50"
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full flex items-center justify-center border transition active:scale-90 min-touch-target"
              style={{
                background: "var(--bg-subtle)",
                borderColor: "var(--border-light)",
                color: "var(--text-primary)",
              }}
            >
              <i className={`fas ${isEnglish ? "fa-chevron-right" : "fa-chevron-left"} text-sm`} />
            </button>
          </div>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden space-y-4">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none scroll-smooth">
            {Array.from({ length: TOTAL }).map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[78vw] max-w-[280px] snap-center rounded-3xl p-4 border shadow-xl"
                style={{
                  background: "var(--bg-secondary)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-inner border" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-tertiary)" }}>
                  <Image src={imgSrc(idx + 1)} alt={`Review ${idx + 1}`} fill sizes="280px" className="object-contain" />
                </div>
              </div>
            ))}
            <div
              className="flex-shrink-0 w-[78vw] max-w-[280px] snap-center rounded-3xl p-5 border shadow-xl flex flex-col items-center justify-center text-center space-y-3"
              style={{ borderColor: "rgba(201, 168, 76, 0.1)", background: "var(--bg-secondary)" }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-gold" style={{ background: "rgba(201, 168, 76, 0.08)", border: "1px solid rgba(201, 168, 76, 0.15)" }}>
                <i className="fas fa-heart text-lg" />
              </div>
              <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{t("endTitle")}</h3>
              <p className="text-xs font-light leading-relaxed" style={{ color: "var(--text-muted)" }}>{t("endDesc")}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 text-xs" style={{ color: "var(--text-dim)" }}>
            <i className="fas fa-arrows-left-right text-gold/60" />
            <span>{isEnglish ? "Swipe to view all reviews" : "اسحب لمشاهدة جميع الآراء"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
