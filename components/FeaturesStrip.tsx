"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FeaturesStripProps {
  isEnglish: boolean;
}

const ITEMS = (en: boolean) => [
  { icon: "fa-truck-fast",
    title: en ? "Jordanwide Delivery" : "توصيل لكل الأردن",
    desc: en ? "Fast shipping within 24-48 hours to all governates" : "شحن سريع خلال 24-48 ساعة لجميع المحافظات" },
  { icon: "fa-hand-holding-dollar",
    title: en ? "Cash on Delivery" : "دفع عند الاستلام",
    desc: en ? "Pay cash upon delivery with no extra fees" : "ادفع نقداً عند استلام طلبك بدون أي رسوم إضافية" },
  { icon: "fa-rotate-left",
    title: en ? "Free Returns" : "إرجاع مجاني",
    desc: en ? "Free exchange or return within 7 days of delivery" : "استبدال أو إرجاع مجاني خلال 7 أيام من الاستلام" },
  { icon: "fa-certificate",
    title: en ? "EU Quality Certified" : "معتمدة من الاتحاد الأوروبي",
    desc: en ? "All pieces meet EU CE quality standards" : "جميع القطع تخضع لمعايير CE الأوروبية" },
];

export default function FeaturesStrip({ isEnglish }: FeaturesStripProps) {
  const shouldReduceMotion = useReducedMotion();
  const items = ITEMS(isEnglish);
  return (
    <section className="py-12 border-y border-[var(--border-subtle)]" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none md:overflow-visible">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="flex-shrink-0 w-[72vw] max-w-[260px] md:w-full md:max-w-none snap-center"
            >
              <div
                className="flex flex-col items-center text-center p-5 md:p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:border-gold/20 hover:-translate-y-0.5"
                style={{
                  background: "var(--bg-subtle)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-gold text-lg mb-4 transition-all duration-300"
                  style={{ background: "rgba(201, 168, 76, 0.08)", border: "1px solid rgba(201, 168, 76, 0.12)" }}
                >
                  <i className={`fas ${item.icon}`} />
                </div>
                <h4 className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
