"use client";

import Link from "next/link";

interface HeroProps {
  isEnglish: boolean;
}

export default function Hero({ isEnglish }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent-gold/5 via-transparent to-surface-primary pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_30%,rgba(201,168,76,0.08)_0%,transparent_60%),radial-gradient(ellipse_60%_40%_at_80%_70%,rgba(139,92,246,0.04)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-accent-gold-muted text-accent-gold px-4 py-1.5 rounded-full text-xs font-semibold border border-accent-gold-muted backdrop-blur-sm animate-fade-in">
          <i className="fas fa-sparkles text-[10px]" />
          {isEnglish ? "European Design · Locally Crafted" : "تصميم أوروبي · صناعة محلية"}
        </div>

        <h1
          className={`text-4xl md:text-6xl lg:text-7xl leading-tight font-bold ${
            isEnglish ? "font-inter" : "font-alexandria"
          } animate-fade-up`}
        >
          {isEnglish ? "Modern Elegance" : "أناقة عصرية"}
          <br />
          <span className="gold-gradient bg-clip-text text-transparent">
            {isEnglish
              ? "With Italian Fabrics & EU Standards"
              : "بخامات إيطالية ومعايير أوروبية"}
          </span>
        </h1>

        <p className="text-accent-gold/60 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed animate-fade-up">
          {isEnglish
            ? "An exclusive collection of modern European designs, locally handcrafted by skilled artisans using premium imported materials."
            : "تشكيلة حصرية بتصاميم أوروبية عصرية، تُصنع محلياً بأيدٍ ماهرة وبأفضل الخامات المستوردة."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 animate-fade-up">
          <Link
            href="/shop"
            className="btn-primary w-full sm:w-auto"
          >
            {isEnglish ? "Explore Collection" : "استكشف التشكيلة"}
            <i className={`fas ${isEnglish ? "fa-arrow-right" : "fa-arrow-left"} text-xs mr-2`} />
          </Link>

          <Link
            href="/perfumes"
            className="btn-secondary w-full sm:w-auto"
          >
            <i className="fas fa-spray-can-sparkles text-xs ml-2" />
            {isEnglish ? "Our Perfumes" : "عطورنا"}
          </Link>
        </div>

        <div className="glass-card max-w-sm mx-auto p-5 space-y-3 animate-fade-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-gold-muted border border-accent-gold-muted flex items-center justify-center text-accent-gold">
              <i className="fas fa-gift text-lg" />
            </div>
            <div className="text-start">
              <p className="text-xs font-bold text-accent-gold">
                {isEnglish ? "Use code:" : "استخدم الكود:"}
              </p>
              <p className="text-[10px] text-accent-gold/40">
                {isEnglish ? "Get 10% off your first order" : "احصل على 10% خصم على طلبك الأول"}
              </p>
            </div>
          </div>
          <div className="inline-block rounded-lg px-4 py-2 bg-surface-primary border border-accent-gold-muted text-accent-gold font-mono font-bold tracking-widest text-lg mx-auto">
            SK10
          </div>
        </div>
      </div>
    </section>
  );
}
