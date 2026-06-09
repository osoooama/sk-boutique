"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

interface AboutSectionProps {
  isEnglish: boolean;
}

const FEATURES = (en: boolean) => [
  { icon: "fa-crown", title: en ? "European Modern Design" : "تصميم أوروبي عصري", desc: en ? "Each piece follows the latest European fashion trends with contemporary elegance." : "كل قطعة تتبع أحدث صيحات الموضة الأوروبية بأناقة عصرية." },
  { icon: "fa-truck-fast", title: en ? "Nationwide Delivery" : "توصيل لكافة المحافظات", desc: en ? "Fast and secure shipping covering all cities of the Kingdom." : "شحن سريع وآمن يغطي كل مدن المملكة من الشمال للجنوب." },
  { icon: "fa-leaf", title: en ? "Premium Imported Fabrics" : "خامات مستوردة فاخرة", desc: en ? "Finest materials sourced from Italy, France, and top European mills." : "أفضل المواد الأولية من إيطاليا وفرنسا وأرقى المناشئ الأوروبية." },
  { icon: "fa-star", title: en ? "EU Quality Standards" : "معايير الجودة الأوروبية", desc: en ? "Every piece meets EU CE quality certifications — locally crafted with precision." : "كل قطعة تخضع لمعايير CE الأوروبية — تُصنع محلياً بدقة واحترافية." },
];

function Counter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setVal(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function AboutSection({ isEnglish }: AboutSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const features = FEATURES(isEnglish);

  return (
    <section id="about" className="py-20 border-t border-[var(--border-subtle)]" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Side */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-3 text-xs font-bold tracking-wider uppercase" style={{ color: "var(--gold)" }}>
              <span className="w-8 h-px" style={{ background: "var(--gold)" }} />
              {isEnglish ? "European Design · Local Craftsmanship" : "تصميم أوروبي · صناعة محلية"}
            </div>

            <h2 className={`text-3xl md:text-4xl font-bold leading-tight ${isEnglish ? "font-playfair" : "font-noto"}`} style={{ color: "var(--text-primary)" }}>
              {isEnglish ? "European elegance, locally crafted with precision" : "أناقة أوروبية، تُصنع محلياً بدقة واحترافية"}
            </h2>

            <p className="text-sm md:text-base leading-relaxed font-light" style={{ color: "var(--text-secondary)" }}>
              {isEnglish
                ? "At SK BOUTIQUE, we blend modern European design with local craftsmanship. Our exclusive collection uses premium imported fabrics from Italy and France, meticulously crafted by skilled local hands to meet EU quality standards."
                : "في SK BOUTIQUE، ندمج التصميم الأوروبي العصري مع الحرفية المحلية. مجموعتنا الحصرية تستخدم أفضل الأقمشة المستوردة من إيطاليا وفرنسا، تُصنع بعناية بأيدٍ محلية ماهرة وفق معايير الجودة الأوروبية."}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {features.map((feat, i) => (
                <motion.div
                  key={i}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                  className="flex items-start gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-gold shrink-0 transition-all duration-300"
                    style={{ background: "rgba(201, 168, 76, 0.08)", border: "1px solid rgba(201, 168, 76, 0.12)" }}
                  >
                    <i className={`fas ${feat.icon} text-sm`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{feat.title}</h3>
                    <p className="text-xs font-light" style={{ color: "var(--text-dim)" }}>{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 md:gap-12 pt-4">
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-gold font-playfair">
                  <Counter end={2021} suffix="" />+
                </div>
                <p className="text-[10px] md:text-xs mt-1" style={{ color: "var(--text-dim)" }}>
                  {isEnglish ? "Since" : "منذ"}
                </p>
              </div>
              <div className="w-px h-10" style={{ background: "var(--border-subtle)" }} />
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-gold font-playfair">
                  <Counter end={17} suffix="+" />
                </div>
                <p className="text-[10px] md:text-xs mt-1" style={{ color: "var(--text-dim)" }}>
                  {isEnglish ? "Designs" : "تصميم"}
                </p>
              </div>
              <div className="w-px h-10" style={{ background: "var(--border-subtle)" }} />
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-gold font-playfair">
                  <Counter end={1200} suffix="+" />
                </div>
                <p className="text-[10px] md:text-xs mt-1" style={{ color: "var(--text-dim)" }}>
                  {isEnglish ? "Happy Clients" : "عميل سعيد"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden p-0.5 shadow-2xl border" style={{ borderColor: "var(--border-light)" }}>
              <div className="w-full h-full rounded-3xl flex flex-col items-center justify-center p-8 space-y-6 relative overflow-hidden" style={{ background: "var(--bg-tertiary)" }}>
                <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full blur-xl opacity-80" style={{ background: "linear-gradient(135deg, rgba(201, 168, 76, 0.1), rgba(255,255,255,0.05))" }} />
                  <Image
                    src="/assets/logo_gold.png"
                    alt="SK BOUTIQUE"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain"
                    style={{ filter: "drop-shadow(0 0 12px rgba(201, 168, 76, 0.4))" }}
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-gold tracking-wide font-cairo">SK BOUTIQUE</h3>
                  <p className="text-xs font-light" style={{ color: "var(--text-muted)" }}>
                    {isEnglish ? "Elegance and luxury in unique contemporary designs" : "الأناقة والفخامة بتصاميم عصرية فريدة"}
                  </p>
                </div>
                <div
                  className="px-5 py-2.5 rounded-2xl text-xs font-bold tracking-wider shadow-lg flex items-center gap-2 select-none border"
                  style={{
                    background: "var(--bg-subtle)",
                    borderColor: "var(--border-light)",
                    color: "var(--gold)",
                  }}
                >
                  <i className="fas fa-history text-[10px]" />
                  <span>{isEnglish ? "SK with you since 2021" : "SK معكم منذ 2021"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
