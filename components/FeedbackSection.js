"use client";

import Image from "next/image";

export default function FeedbackSection({ isEnglish, feedbackPage, onSetFeedbackPage }) {
  const t = (key) => {
    const dict = {
      ar: {
        badge: "عائلة SK BOUTIQUE",
        title: "ماذا قالوا عنا؟",
        desc: "تصفح آراء ومحادثات زبائننا الكرام كصفحات كتاب يروي قصة فخرنا وثقتهم في تصاميمنا.",
        page: "صفحة", of: "من",
        endTitle: "شكراً لثقتكم بنا",
        endDesc: "نكبر بكم وبآرائكم الغالية. نسعى دائماً لتقديم الأفضل لتكونوا فخورين بقطعكم الأنيقة من متجرنا.",
        swipe: "اسحب لمشاهدة جميع الآراء (17 رأي)"
      },
      en: {
        badge: "SK BOUTIQUE Family",
        title: "What They Say About Us",
        desc: "Browse our valued customers' reviews and chats like pages of a book that tells the story of our pride and their trust in our designs.",
        page: "Page", of: "of",
        endTitle: "Thank You for Your Trust",
        endDesc: "We grow through you and your valuable feedback. We always strive to provide the best so you can be proud of your elegant pieces.",
        swipe: "Swipe to view all reviews (17 reviews)"
      }
    };
    return dict[isEnglish ? "en" : "ar"][key] || key;
  };

  return (
    <section className="py-20 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] relative overflow-hidden" id="feedback">
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="inline-block bg-gold/10 text-gold px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-gold/15">
            {t("badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] font-cairo">{t("title")}</h2>
          <p className="text-[var(--text-muted)] text-sm max-w-xl mx-auto font-light leading-relaxed">{t("desc")}</p>
        </div>

        <div className="max-w-4xl mx-auto relative px-4">
          
          <div className="hidden md:block relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-[2rem] p-4 md:p-8 shadow-2xl" style={{ boxShadow: "var(--shadow-strong)" }}>
            <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-b from-[var(--border-subtle)] to-transparent pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 bg-[var(--bg-elevated)] rounded-2xl overflow-hidden shadow-inner relative border border-[var(--border-subtle)] min-h-[450px] md:min-h-[500px]">
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/30 via-black/60 to-black/30 border-x border-black/10 z-10" />

              <div className="p-4 md:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-[var(--border-subtle)] bg-gradient-to-l from-[var(--bg-elevated)] to-[var(--bg-elevated)] relative group">
                <div className="absolute top-3 right-4 text-[10px] text-[var(--text-dim)] font-mono">
                  {t("page")} {feedbackPage * 2 + 1}
                </div>
                <div className="w-full h-full relative rounded-xl overflow-hidden shadow-md aspect-[3/4] max-w-[320px]">
                  <Image
                    src={"/assets/feedback-" + (feedbackPage * 2 + 1) + ".jpg"}
                    alt={isEnglish ? "Customer review " + (feedbackPage * 2 + 1) : "رأي عميل رقم " + (feedbackPage * 2 + 1)}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-contain bg-zinc-950"
                  />
                </div>
              </div>

              <div className="p-4 md:p-8 flex flex-col items-center justify-center bg-gradient-to-r from-[var(--bg-elevated)] to-[var(--bg-elevated)] relative">
                <div className="absolute top-3 left-4 text-[10px] text-[var(--text-dim)] font-mono">
                  {t("page")} {feedbackPage * 2 + 2}
                </div>
                
                {feedbackPage * 2 + 2 <= 17 ? (
                  <div className="w-full h-full relative rounded-xl overflow-hidden shadow-md aspect-[3/4] max-w-[320px]">
                    <Image
                      src={"/assets/feedback-" + (feedbackPage * 2 + 2) + ".jpg"}
                      alt={isEnglish ? "Customer review " + (feedbackPage * 2 + 2) : "رأي عميل رقم " + (feedbackPage * 2 + 2)}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-contain bg-zinc-950"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-[320px] aspect-[3/4] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded-xl border border-gold/10">
                    <div className="w-16 h-16 rounded-full bg-gold/5 border border-gold/15 flex items-center justify-center text-gold">
                      <i className="fas fa-heart text-xl animate-pulse" />
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] text-base font-cairo">{t("endTitle")}</h3>
                    <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">{t("endDesc")}</p>
                    <div className="flex items-center gap-1 text-[10px] text-gold font-cinzel">
                      <Image src="/assets/logo_gold.png" alt="Logo" width={16} height={16} className="w-4 h-4 object-contain inline" />
                      <span>BOUTIQUE</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-black/40 to-transparent pointer-events-none rounded-l-[2rem]" />
            <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-l from-black/40 to-transparent pointer-events-none rounded-r-[2rem]" />
          </div>

          <div className="hidden md:flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => onSetFeedbackPage((prev) => (prev === 0 ? 8 : prev - 1))}
              className="w-11 h-11 rounded-full bg-[var(--bg-subtle)] hover:bg-gold hover:text-black border border-[var(--border-light)] flex items-center justify-center transition text-[var(--text-primary)] active:scale-95 shadow-md cursor-pointer"
              aria-label={isEnglish ? "Previous page" : "الصفحة السابقة"}
            >
              <i className="fas fa-chevron-right text-sm" />
            </button>

            <div className="text-xs text-[var(--text-dim)] font-medium font-sans">
              {t("page")} <span className="text-gold font-bold">{feedbackPage + 1}</span> {t("of")} <span className="text-[var(--text-primary)]">9</span>
            </div>

            <button
              onClick={() => onSetFeedbackPage((prev) => (prev === 8 ? 0 : prev + 1))}
              className="w-11 h-11 rounded-full bg-[var(--bg-subtle)] hover:bg-gold hover:text-black border border-[var(--border-light)] flex items-center justify-center transition text-[var(--text-primary)] active:scale-95 shadow-md cursor-pointer"
              aria-label={isEnglish ? "Next page" : "الصفحة التالية"}
            >
              <i className="fas fa-chevron-left text-sm" />
            </button>
          </div>

          <div className="md:hidden space-y-4">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-none px-4 scroll-smooth">
              {Array.from({ length: 17 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[78vw] max-w-[280px] snap-center bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-3xl p-4 shadow-xl relative"
                >
                  <div className="absolute top-3.5 right-4 text-[9px] text-[var(--text-dim)] font-mono tracking-wider font-semibold">
                    {isEnglish ? `Customer Review ${idx + 1} / 17` : `رأي عميل ${idx + 1} / 17`}
                  </div>
                  <div className="w-full relative aspect-[3/4] rounded-2xl overflow-hidden shadow-inner mt-6 border border-[var(--border-subtle)] bg-zinc-950">
                    <Image
                      src={`/assets/feedback-${idx + 1}.jpg`}
                      alt={isEnglish ? "Customer review " + (idx + 1) : `رأي عميل رقم ${idx + 1}`}
                      fill
                      sizes="280px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
              
              <div className="flex-shrink-0 w-[78vw] max-w-[280px] snap-center bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-elevated)] border border-gold/10 rounded-3xl p-5 shadow-xl flex flex-col items-center justify-center text-center space-y-4 relative">
                <div className="w-14 h-14 rounded-full bg-gold/5 border border-gold/15 flex items-center justify-center text-gold">
                  <i className="fas fa-heart text-lg animate-pulse" />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] text-sm font-cairo">{t("endTitle")}</h3>
                <p className="text-[11px] text-[var(--text-muted)] font-light leading-relaxed px-2">{t("endDesc")}</p>
                <div className="flex items-center gap-1 text-[9px] text-gold font-cinzel">
                  <Image src="/assets/logo_gold.png" alt="Logo" width={14} height={14} className="w-3.5 h-3.5 object-contain inline" />
                  <span>BOUTIQUE</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-[var(--text-dim)] text-[11px]">
              <i className="fas fa-arrows-left-right text-gold/60 animate-pulse" />
              <span>{t("swipe")}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
