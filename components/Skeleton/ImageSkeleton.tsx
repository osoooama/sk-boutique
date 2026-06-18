"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { springs } from "@/lib/springs";

interface ImageSkeletonProps {
  className?: string;
  children: React.ReactNode;
}

export default function ImageSkeleton({ className = "", children }: ImageSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && <div className="skeleton-gold absolute inset-0 z-[1]" />}
      <div
        className={loaded ? "" : "invisible"}
        onLoad={() => setLoaded(true)}
      >
        {children}
      </div>
      {loaded && (
        <motion.div
          className="absolute inset-0 z-[2]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ ...springs.gentle, delay: 0.2 }}
          onAnimationComplete={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
