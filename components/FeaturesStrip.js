"use client";

export default function FeaturesStrip({ isEnglish }) {
  const items = [
    {
      icon: "fa-truck-fast",
      title: isEnglish ? "Jordanwide Delivery" : "توصيل لكل الأردن",
      desc: isEnglish ? "Fast shipping within 24-48 hours to all governates" : "شحن سريع خلال 24-48 ساعة لجميع المحافظات"
    },
    {
      icon: "fa-hand-holding-dollar",
      title: isEnglish ? "Cash on Delivery" : "دفع عند الاستلام",
      desc: isEnglish ? "Pay cash upon delivery with no extra fees" : "ادفع نقداً عند استلام طلبك بدون أي رسوم إضافية"
    },
    {
      icon: "fa-rotate-left",
      title: isEnglish ? "Free Returns" : "إرجاع مجاني",
      desc: isEnglish ? "Free exchange or return within 7 days of delivery" : "استبدال أو إرجاع مجاني خلال 7 أيام من الاستلام"
    },
    {
      icon: "fa-gem",
      title: isEnglish ? "Premium Materials" : "خامات فاخرة",
      desc: isEnglish ? "Carefully selected items from the finest linen, silk, and natural wool" : "قطع مختارة بعناية من أجود الكتان والحرير والصوف الطبيعي"
    }
  ];

  return (
    <section className="py-12 border-y border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-3 md:p-4 group">
              <div className="w-12 h-12 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center text-gold mb-4 text-lg group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-300">
                <i className={`fas ${item.icon}`} />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">{item.title}</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
