"use client";

import { motion } from "framer-motion";

export default function NotificationBar() {
  return (
    <motion.div
      initial={{ y: -32 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="h-8 flex items-center justify-center overflow-hidden"
      style={{
        background: "rgba(201,168,76,0.08)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
      }}
    >
      <div className="hidden md:block text-[11px] whitespace-nowrap" style={{ color: "#C9A96E" }}>
        <i className="fas fa-truck-fast ml-1.5" />
        توصيل لكل الأردن · إرجاع 7 أيام · خصم 20% كود SK30
        <i className="fas fa-certificate mr-1.5" />
      </div>
      <div className="md:hidden w-full overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap text-[11px]"
          style={{ color: "#C9A96E" }}
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <span className="mx-4">
            <i className="fas fa-truck-fast ml-1.5" />
            توصيل لكل الأردن · إرجاع 7 أيام · خصم 20% كود SK30
            <i className="fas fa-certificate mr-1.5" />
          </span>
          <span className="mx-4">
            <i className="fas fa-truck-fast ml-1.5" />
            توصيل لكل الأردن · إرجاع 7 أيام · خصم 20% كود SK30
            <i className="fas fa-certificate mr-1.5" />
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
