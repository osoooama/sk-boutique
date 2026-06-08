"use client";

import Image from "next/image";

export default function AboutSection({ isEnglish }) {
  const features = isEnglish
    ? [
        { icon: "fa-crown", title: "Heritage with a Modern Vision", desc: "Blending geometric Shemagh patterns smoothly into high-end fashion pieces." },
        { icon: "fa-truck-fast", title: "Nationwide Delivery", desc: "Fast and secure shipping covering all cities of the Kingdom." },
        { icon: "fa-leaf", title: "Luxury Natural Materials", desc: "100% natural silk, cashmere, and merino wool in every piece." },
        { icon: "fa-star", title: "Exclusive Limited Design", desc: "Each piece is a limited edition design, because your uniqueness deserves the exceptional." }
      ]
    : [
        { icon: "fa-crown", title: "التراث برؤية عصرية", desc: "دمج أنماط الشماغ الهندسية بنعومة فائقة في قطع الملابس الراقية." },
        { icon: "fa-truck-fast", title: "توصيل لكافة المحافظات", desc: "شحن سريع وآمن يغطي كل مدن المملكة من الشمال للجنوب." },
        { icon: "fa-leaf", title: "خامات طبيعية فاخرة", desc: "حرير، كشمير، وصوف ميرينو طبيعي 100% في كل قطعة." },
        { icon: "fa-star", title: "تصميم حصري محدود", desc: "كل قطعة تصميم محدود الإصدار، لأن تميزك يستحق الفريد." }
      ];

  return (
    <section id="about" className="py-20 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-gold text-xs font-bold tracking-wider uppercase flex items-center gap-2">
              <span className="w-6 h-px bg-gold/40" />
              {isEnglish ? "Authenticity & Uniqueness" : "أصالة وتفرد"}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] font-cairo leading-tight">
              {isEnglish
                ? "We weave our Jordanian heritage with contemporary touches"
                : "نخيط تراثنا الأردني بلمسات معاصرة"}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-light">
              {isEnglish
                ? "At BOUTIQUE, we are proud of our Jordanian identity. Our exclusive collection merges traditional fringed Jordanian Shemagh details into the collars and edges of luxury fashion, combining classic and modern elements with unmatched style."
                : "في BOUTIQUE، نفخر بهويتنا الأردنية. مجموعتنا الحصرية تدمج تفاصيل نمط الشماغ الأردني التراثي المهدّب في ياقات وأطراف الأزياء الفاخرة، لتجمع بين الكلاسيكية والحداثة بأسلوب لا مثيل له."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {features.map((feat, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gold/5 border border-gold/10 flex items-center justify-center text-gold shrink-0 group-hover:bg-gold/10 group-hover:scale-105 transition-all duration-300">
                    <i className={`fas ${feat.icon} text-sm`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] text-sm mb-1">{feat.title}</h3>
                    <p className="text-xs text-[var(--text-dim)] font-light">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden color-cycle-gradient p-0.5 shadow-2xl border border-[var(--border-light)] group">
              <div className="w-full h-full bg-[var(--bg-tertiary)] rounded-3xl flex flex-col items-center justify-center p-8 space-y-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[var(--bg-subtle)] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                
                <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#cfa850]/5 via-[#ffffff]/5 to-[#e5e5ea]/5 rounded-full blur-xl opacity-80" />
                  <Image
                    src="/assets/logo_gold.png"
                    alt="SK BOUTIQUE — تصاميم أردنية عصرية"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain color-cycle-logo drop-shadow-[0_0_12px_rgba(207,168,80,0.4)]"
                  />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold font-cairo text-gold tracking-wide">
                    SK BOUTIQUE
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-light">
                    {isEnglish ? "Elegance and luxury in unique contemporary designs" : "الأناقة والفخامة بتصاميم عصرية فريدة"}
                  </p>
                </div>

                <div className="bg-[var(--bg-subtle)] border border-[var(--border-light)] text-gold px-5 py-2.5 rounded-2xl text-xs font-bold font-cairo tracking-wider shadow-lg flex items-center gap-2 select-none group-hover:border-gold/30 transition-all duration-300">
                  <i className="fas fa-history text-[10px] text-gold/80" />
                  <span>{isEnglish ? "SK with you since 2021" : "SK معكم منذ 2021"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
