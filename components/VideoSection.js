"use client";

export default function VideoSection({ isEnglish, onApplyPromo }) {
  return (
    <section className="py-20 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6 text-start">
            <span className="inline-flex items-center gap-1.5 bg-gold/10 text-gold border border-gold/25 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">
              {isEnglish ? "Authenticity & Quality" : "أصالة وجودة بلمسات أردنية"}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] leading-tight font-cairo">
              {isEnglish ? (
                <>Everything we have is beautiful <br /><span className="text-gold">with embroidery telling our story</span></>
              ) : (
                <>كل ما لدينا جميل <br /><span className="text-gold">بتطريزات تحكي قصة أصالتنا</span></>
              )}
            </h2>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed font-light">
              {isEnglish
                ? "We take pride in our Jordanian identity. Sara Krishan Boutique is pleased to present this special collection to complete your look with authenticity and distinctive embroidery."
                : "نعتز بهويتنا الأردنية وتفاصيلها الفريدة. يسر متجر سارة كريشان تقديم هذه التشكيلة الخاصة لتكتمل إطلالتكم بالأصالة والتطاريز المميزة."}
            </p>
            
            <div className="space-y-4 pt-2">
              <div
                onClick={() => onApplyPromo("NASHAMA")}
                className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-elevated)] border border-gold/20 rounded-3xl p-6 hover:border-gold/45 transition-all duration-300 cursor-pointer shadow-lg relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex justify-between items-start">
                  <span className="bg-gold text-black text-[10px] font-bold px-3 py-1 rounded-full">
                    {isEnglish ? "Nashama Discount" : "خصم النشامى"}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                    <i className="fas fa-percent text-xs" />
                  </div>
                </div>
                
                <div className="mt-4 space-y-1.5">
                  <div className="text-3xl font-black text-[var(--text-primary)]">
                    {isEnglish ? "15% Discount" : "خصم 15%"}
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">
                    {isEnglish ? "On all luxury abayas and sets in the store" : "على جميع أطقم وعباءات المتجر الفاخرة"}
                  </p>
                </div>
                
                <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-dim)]">
                    {isEnglish ? "Promo Code (Click to Apply):" : "كود الخصم (اضغط للتطبيق):"}
                  </span>
                  <span className="bg-[var(--bg-primary)] border border-[var(--border-light)] text-gold font-mono font-bold tracking-widest px-4 py-1.5 rounded-xl group-hover:border-gold/30 transition-colors">
                    NASHAMA
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gold/30 shadow-gold/10 bg-[var(--bg-tertiary)] group transition-all duration-500 hover:border-gold/50">
              
              <div className="h-4 shemagh-pattern w-full border-b border-gold/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              </div>
              
              <div className="p-1 bg-gradient-to-b from-gold/10 to-transparent">
                <div className="aspect-video w-full relative rounded-2xl overflow-hidden bg-[var(--bg-primary)] border border-[var(--border-subtle)]">
                  <iframe
                    src="https://www.youtube.com/embed/PhoDo8FA0TQ?autoplay=0&rel=0"
                    title={isEnglish ? "Pride of Local Industry - SK Boutique" : "فخر الصناعة المحلية - متجر سارة كريشان"}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              
              <div className="bg-[var(--bg-secondary)] px-6 py-4 flex items-center justify-between border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="font-semibold text-[var(--text-primary)]">
                    {isEnglish ? "Watch the luxury and authenticity of our designs and hand-embroidery" : "شاهد فخامة وأصالة تصاميمنا والتطريز اليدوي"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-gold">
                  <i className="fab fa-youtube text-red-600 text-sm animate-pulse" />
                  <span>{isEnglish ? "Pride of Local Industry" : "فخر الصناعة المحلية"}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
