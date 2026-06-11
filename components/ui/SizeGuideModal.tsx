"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEnglish: boolean;
}

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const MEASUREMENTS: Record<string, { bust: string; waist: string; hips: string }> = {
  XS:  { bust: "80-84", waist: "62-66", hips: "88-92" },
  S:   { bust: "84-88", waist: "66-70", hips: "92-96" },
  M:   { bust: "88-92", waist: "70-74", hips: "96-100" },
  L:   { bust: "92-96", waist: "74-78", hips: "100-104" },
  XL:  { bust: "96-100", waist: "78-83", hips: "104-108" },
  XXL: { bust: "100-106", waist: "83-88", hips: "108-114" },
};

export default function SizeGuideModal({ isOpen, onClose, isEnglish }: SizeGuideModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
            initial={{ opacity: 0, scale: 0.95, y: "-50%", x: 20 }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: "-50%", x: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            dir={isEnglish ? "ltr" : "rtl"}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`font-bold text-sm ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                {isEnglish ? "Size Guide" : "دليل المقاسات"}
              </h3>
              <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/10 text-luxury-gold hover:bg-white/5 transition-all">
                <i className="fas fa-times text-xs" />
              </button>
            </div>

            <p className={`text-[10px] text-luxury-gold/40 mb-4 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
              {isEnglish
                ? "Measurements in cm. For the best fit, measure a similar item you own."
                : "القياسات بالسنتيمتر. للحصول على أفضل مقاس، قم بقياس قطعة مشابهة تمتلكها."}
            </p>

            <div className="overflow-x-auto scrollbar-none">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className={`py-2 px-3 text-left text-luxury-gold/60 font-medium ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                      {isEnglish ? "Size" : "المقاس"}
                    </th>
                    <th className={`py-2 px-3 text-left text-luxury-gold/60 font-medium ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                      {isEnglish ? "Bust" : "الصدر"}
                    </th>
                    <th className={`py-2 px-3 text-left text-luxury-gold/60 font-medium ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                      {isEnglish ? "Waist" : "الخصر"}
                    </th>
                    <th className={`py-2 px-3 text-left text-luxury-gold/60 font-medium ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                      {isEnglish ? "Hips" : "الأرداف"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SIZES.map((size) => (
                    <tr key={size} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className={`py-2.5 px-3 font-bold text-luxury-gold ${isEnglish ? "font-inter" : "font-alexandria"}`}>{size}</td>
                      <td className={`py-2.5 px-3 text-luxury-white/60 ${isEnglish ? "font-inter" : "font-alexandria"}`}>{MEASUREMENTS[size].bust}</td>
                      <td className={`py-2.5 px-3 text-luxury-white/60 ${isEnglish ? "font-inter" : "font-alexandria"}`}>{MEASUREMENTS[size].waist}</td>
                      <td className={`py-2.5 px-3 text-luxury-white/60 ${isEnglish ? "font-inter" : "font-alexandria"}`}>{MEASUREMENTS[size].hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-2">
              <p className={`text-[10px] text-luxury-gold/30 ${isEnglish ? "font-inter" : "font-alexandria"}`}>
                <i className="fas fa-lightbulb text-luxury-gold/40 mr-1" />
                {isEnglish
                  ? "Run small? We recommend going one size up for a relaxed fit."
                  : "المقاس صغير؟ ننصح باختيار مقاس أكبر للحصول على مقاس مريح."}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
