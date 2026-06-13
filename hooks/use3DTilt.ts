import { useRef, useState, useCallback, useEffect } from "react";

const MAX_ROTATION = 8;

export function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;

    setRotateY((mouseX / (rect.width / 2)) * MAX_ROTATION);
    setRotateX(-(mouseY / (rect.height / 2)) * MAX_ROTATION);
    setShimmerPos({ x: xPct, y: yPct });
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const tiltStyle: React.CSSProperties = {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovering ? 1.03 : 1})`,
    transition: isHovering ? "transform 0.05s ease-out" : "transform 0.5s ease-out",
    willChange: "transform",
  };

  const shimmerStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    borderRadius: "inherit",
    opacity: isHovering ? 0.15 : 0,
    transition: "opacity 0.3s ease",
    background: `radial-gradient(circle at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(201, 169, 110, 0.25) 0%, transparent 60%)`,
  };

  return { ref, tiltStyle, shimmerStyle, isHovering };
}
