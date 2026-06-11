"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { img: 32, text: "text-base" },
  md: { img: 48, text: "text-xl" },
  lg: { img: 80, text: "text-3xl" },
};

export default function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const s = sizes[size];

  return (
    <motion.a
      href="/"
      className={`flex items-center gap-3 select-none group ${className}`}
      style={{ textDecoration: "none" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="relative"
        animate={{ filter: [
          "drop-shadow(0 0 8px rgba(201, 168, 76, 0.4)) drop-shadow(0 0 16px rgba(232, 232, 232, 0.2))",
          "drop-shadow(0 0 12px rgba(201, 168, 76, 0.6)) drop-shadow(0 0 24px rgba(232, 232, 232, 0.3))",
          "drop-shadow(0 0 8px rgba(201, 168, 76, 0.4)) drop-shadow(0 0 16px rgba(232, 232, 232, 0.2))",
        ] }}
        transition={{ duration: 3, repeat: Infinity, ease: "ease-in-out" }}
      >
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.3) 0%, rgba(232,232,232,0.15) 50%, transparent 70%)",
          }}
        />
        <Image
          src="/logo/sk-logo.webp"
          alt="SK BOUTIQUE"
          width={s.img}
          height={s.img}
          className="relative w-auto h-auto object-contain"
          style={{
            filter:
              "drop-shadow(0 0 8px rgba(201, 168, 76, 0.4)) drop-shadow(0 0 16px rgba(232, 232, 232, 0.2))",
          }}
          priority
        />
      </motion.div>

      {showText && (
        <span
          className={`font-bold tracking-wider ${s.text}`}
          style={{
            background: "linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 12px rgba(201, 168, 76, 0.3))",
          }}
        >
          SK{" "}
          <span className="font-light tracking-[0.15em]" style={{ 
            background: "linear-gradient(135deg, #E8E8E8 0%, #FFFFFF 50%, #E8E8E8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 8px rgba(232, 232, 232, 0.3))",
          }}>
            BOUTIQUE
          </span>
        </span>
      )}
    </motion.a>
  );
}
