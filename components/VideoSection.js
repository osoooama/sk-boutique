"use client";

export default function VideoSection({ isEnglish, onApplyPromo }) {
  return (
    <section className="py-20 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <div className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-elevated)] border border-gold/20 rounded-3xl p-6 hover:border-gold/45 transition-all duration-300 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gold/5" />

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <i className="fas fa-gift text-xl text-gold" />
                </div>
                <div>
                  <span className="bg-gold text-black text-[10px] font-bold px-3 py-1 rounded-full">
                    {isEnglish ? "Exclusive Offer" : "عرض حصري"}
                  </span>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {isEnglish ? "Limited time promotion" : "عرض لفترة محدودة"}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 mb-4">
                <div className="text-3xl font-black text-[var(--text-primary)]">
                  {isEnglish ? "10% Discount" : "خصم 10%"}
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  {isEnglish ? "On all items — use code below at checkout" : "على جميع القطع — استخدم الكود أدناه عند الدفع"}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <span className="text-[var(--text-dim)]">
                  {isEnglish ? "Use code:" : "استخدم الكود:"}
                </span>
                <span className="bg-[var(--bg-primary)] border border-[var(--border-light)] text-gold font-mono font-bold tracking-widest px-4 py-1.5 rounded-xl">
                  SK10
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
