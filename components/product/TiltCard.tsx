"use client";

import type { ReactNode } from "react";
import { use3DTilt } from "@/hooks/use3DTilt";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const { ref, tiltStyle, shimmerStyle } = use3DTilt();
  return (
    <div ref={ref} style={tiltStyle} className={className}>
      {children}
      <div style={shimmerStyle} />
    </div>
  );
}
