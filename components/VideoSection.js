"use client";

export default function VideoSection({ isEnglish, onApplyPromo }) {
  return (
    <section className="py-20 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <div
              onClick={() => onApplyPromo("NASHAMA")}
              className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-elevated)] border border-gold/20 rounded-3xl p-6 hover:border-gold/45 transition-all duration-300 cursor-pointer shadow-lg relative group overflow-hidden active:scale-[0.98] min-touch-target"
            >
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                  <i className="fas fa-futbol text-xl text-red-500" />
                </div>
                <div>
                  <span className="bg-gold text-black text-[10px] font-bold px-3 py-1 rounded-full">
                    {isEnglish ? "Support Al-Nashama 🇯🇴" : "دعم النشامى 🇯🇴"}
                  </span>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {isEnglish ? "Stand with our national team" : "قف مع منتخبنا الوطني"}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="text-3xl font-black text-[var(--text-primary)]">
                  {isEnglish ? "15% Discount" : "خصم 15%"}
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  {isEnglish ? "On all items — use code below to support our team" : "على جميع القطع — استخدم الكود أدناه لدعم منتخبنا"}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-dim)]">
                  {isEnglish ? "Click to apply:" : "اضغط للتطبيق:"}
                </span>
                <span className="bg-[var(--bg-primary)] border border-[var(--border-light)] text-gold font-mono font-bold tracking-widest px-4 py-1.5 rounded-xl group-hover:border-gold/30 transition-colors">
                  NASHAMA
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-600/5 to-gold/5 border border-red-600/10 rounded-3xl p-6 text-center space-y-3 shadow-lg">
              <div className="w-14 h-14 rounded-full bg-red-600/10 flex items-center justify-center mx-auto">
                <i className="fas fa-hand-holding-heart text-xl text-red-500" />
              </div>
              <h3 className="font-bold text-[var(--text-primary)] text-sm">
                {isEnglish ? "Donate to Al-Nashama" : "تبرع لدعم النشامى"}
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
                {isEnglish
                  ? "Part of every purchase goes to supporting the Jordanian national team. Shop with purpose — every item you buy helps our heroes on the field."
                  : "جزء من كل عملية شراء يذهب لدعم المنتخب الوطني الأردني. تسوق بهدف — كل قطعة تشتريها تساعد أبطالنا في الميدان."}
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[10px] font-bold text-red-500/80 tracking-wide">
                  {isEnglish ? "#We_Are_All_AlNashama" : "#كلنا_النشامى"}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gold/30 bg-[var(--bg-tertiary)] transition-all duration-500 hover:border-gold/50">
              <div className="aspect-video w-full relative overflow-hidden bg-[var(--bg-primary)]">
                <iframe
                  src="https://www.youtube.com/embed/PhoDo8FA0TQ?autoplay=0&rel=0"
                  title={isEnglish ? "SK Boutique Collection" : "مجموعة متجر سارة كريشان"}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
