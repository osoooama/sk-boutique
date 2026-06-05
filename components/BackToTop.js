"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-20 md:bottom-24 right-4 md:right-6 z-50 w-11 h-11 rounded-full bg-gold hover:bg-gold/90 text-black shadow-lg shadow-gold/10 flex items-center justify-center transition-all duration-300 active:scale-90 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up text-sm" />
    </button>
  );
}
