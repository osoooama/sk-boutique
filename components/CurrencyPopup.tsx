"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrencyRates } from "@/hooks/useCurrencyRates";

const CURRENCIES = [
  { code: "USD", flag: "🇺🇸", name: "دولار أمريكي", symbol: "$", suffix: "" },
  { code: "EUR", flag: "🇪🇺", name: "يورو", symbol: "€", suffix: "" },
  { code: "GBP", flag: "🇬🇧", name: "جنيه إسترليني", symbol: "£", suffix: "" },
  { code: "SAR", flag: "🇸🇦", name: "ريال سعودي", symbol: "", suffix: " ﷼" },
  { code: "AED", flag: "🇦🇪", name: "درهم إماراتي", symbol: "", suffix: " د.إ" },
  { code: "TRY", flag: "🇹🇷", name: "ليرة تركية", symbol: "", suffix: " ₺" },
  { code: "EGP", flag: "🇪🇬", name: "جنيه مصري", symbol: "", suffix: " ج.م" },
];

function CountUp({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const duration = 600;
    const start = performance.now();
    const from = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (value - from) * eased);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [value]);

  return <>{display.toFixed(2)}</>;
}

interface CurrencyPopupProps {
  price: number;
  children: React.ReactNode;
}

export default function CurrencyPopup({ price, children }: CurrencyPopupProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [popupDir, setPopupDir] = useState<"below" | "above">("below");
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const { rates, loading, lastUpdated } = useCurrencyRates();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open || isMobile) return;
    const timer = setTimeout(() => {
      if (!triggerRef.current || !popupRef.current) return;
      const trigger = triggerRef.current.getBoundingClientRect();
      const popup = popupRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - trigger.bottom;
      const spaceAbove = trigger.top;
      setPopupDir(spaceBelow < popup.height && spaceAbove > spaceBelow ? "above" : "below");
    }, 50);
    return () => clearTimeout(timer);
  }, [open, isMobile]);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      if (!prev) {
        try { navigator?.vibrate?.(10); } catch { /* ignore */ }
      }
      return !prev;
    });
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, close]);

  const formatTime = (d: Date | null) => {
    if (!d) return "-";
    return d.toLocaleTimeString("ar-JO", { hour: "2-digit", minute: "2-digit" });
  };

  const renderContent = () => (
    <div className="space-y-1">
      <div
        className="flex items-center justify-between px-1 py-2 mb-1"
        style={{ background: "rgba(201,168,76,0.08)", borderRadius: "12px" }}
      >
        <span className="text-xs" style={{ color: "#A8A89A" }}>السعر الأصلي</span>
        <span
          className="text-xs font-bold px-2.5 py-0.5 rounded-lg"
          style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}
        >
          {price} د.أ
        </span>
      </div>

      {loading ? (
        <div className="space-y-2 py-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 py-1.5">
              <div className="w-8 h-8 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
              <div className="flex-1 space-y-1">
                <div className="h-2.5 w-24 rounded" style={{ background: "rgba(255,255,255,0.06)" }} />
                <div className="h-2 w-16 rounded" style={{ background: "rgba(255,255,255,0.04)" }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-0.5">
          {CURRENCIES.map((cur, idx) => {
            const rate = rates[cur.code];
            const converted = rate ? price * rate : 0;
            return (
              <div key={cur.code}>
                <div
                  className="flex items-center justify-between px-1 py-2 rounded-xl transition-all duration-300 group"
                  style={{
                    background: "transparent",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.08), transparent)",
                    }}
                  />
                  <div className="flex items-center gap-2.5 relative z-[1]">
                    <span className="text-base">{cur.flag}</span>
                    <span className="text-xs" style={{ color: "#A8A89A" }}>{cur.name}</span>
                  </div>
                  <span className="text-xs font-bold relative z-[1]" style={{ color: "#C9A84C", fontVariantNumeric: "tabular-nums" }}>
                    {cur.symbol}<CountUp value={converted} />{cur.suffix}
                  </span>
                </div>
                {idx < CURRENCIES.length - 1 && (
                  <div style={{ height: "1px", background: "rgba(255,255,255,0.04)", margin: "0 4px" }} />
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 pb-1 mt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <span className="text-[10px]" style={{ color: "#6B6B5F" }}>
          آخر تحديث: {formatTime(lastUpdated)}
        </span>
        <span className="text-[10px]" style={{ color: "#6B6B5F" }}>الأسعار تقريبية</span>
      </div>
    </div>
  );

  return (
    <>
      <span
        ref={triggerRef}
        onClick={toggle}
        className="cursor-pointer inline-block"
        style={{ touchAction: "manipulation" }}
      >
        {children}
      </span>

      <AnimatePresence>
        {open && (
          <>
            {isMobile ? (
              <>
                <motion.div
                  className="fixed inset-0 z-50"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={close}
                />
                <motion.div
                  className="fixed bottom-0 left-0 right-0 z-50 rounded-t-[20px] overflow-hidden"
                  style={{
                    background: "rgba(15,15,20,0.95)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    borderBottom: "none",
                  }}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 200 }}
                  dragElastic={{ top: 0, bottom: 0.6 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.y > 80) close();
                  }}
                >
                  <div className="flex justify-center pt-3 pb-1">
                    <div
                      className="w-10 h-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    />
                  </div>
                  <div className="px-5 pb-6 pt-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold" style={{ color: "#F5F5F0" }}>تحويل السعر</h3>
                      <button
                        onClick={close}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors"
                        style={{ color: "#6B6B5F" }}
                      >
                        <i className="fas fa-times" />
                      </button>
                    </div>
                    {renderContent()}
                  </div>
                </motion.div>
              </>
            ) : (
              <motion.div
                ref={popupRef}
                className="fixed z-50"
                style={{
                  left: triggerRef.current
                    ? Math.min(
                        triggerRef.current.getBoundingClientRect().left +
                          triggerRef.current.getBoundingClientRect().width / 2 -
                          140,
                        window.innerWidth - 300
                      )
                    : "50%",
                  top: popupDir === "below"
                    ? (triggerRef.current?.getBoundingClientRect().bottom ?? 0) + 8
                    : (triggerRef.current?.getBoundingClientRect().top ?? 0) - 8,
                  transform: popupDir === "above" ? "translateY(-100%)" : "none",
                  width: "280px",
                  background: "rgba(15,15,20,0.95)",
                  backdropFilter: "blur(24px)",
                  borderRadius: "20px",
                  border: "1px solid rgba(201,168,76,0.3)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <div
                  className="absolute w-3 h-3 rotate-45"
                  style={{
                    background: "rgba(15,15,20,0.95)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    top: popupDir === "below" ? "-6px" : "auto",
                    bottom: popupDir === "above" ? "-6px" : "auto",
                    left: "50%",
                    marginLeft: "-6px",
                    borderBottom: popupDir === "below" ? "none" : "1px solid rgba(201,168,76,0.3)",
                    borderRight: popupDir === "below" ? "none" : "1px solid rgba(201,168,76,0.3)",
                    borderTop: popupDir === "below" ? "1px solid rgba(201,168,76,0.3)" : "none",
                    borderLeft: popupDir === "below" ? "1px solid rgba(201,168,76,0.3)" : "none",
                  }}
                />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold" style={{ color: "#F5F5F0" }}>تحويل السعر</h3>
                    <button
                      onClick={close}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-colors"
                      style={{ color: "#6B6B5F" }}
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                  {renderContent()}
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
