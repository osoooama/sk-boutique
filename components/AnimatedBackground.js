"use client";

import { useEffect, useRef, useCallback, useState } from "react";

const ORBS = [
  { size: 500, top: "8%", left: "3%", baseOpacity: 0.035, color: "rgba(207, 168, 80, 0.5)", speed: 1 },
  { size: 350, top: "35%", right: "5%", baseOpacity: 0.025, color: "rgba(220, 200, 170, 0.4)", speed: 0.8 },
  { size: 600, bottom: "15%", left: "10%", baseOpacity: 0.03, color: "rgba(247, 231, 206, 0.35)", speed: 1.2 },
  { size: 280, top: "55%", right: "15%", baseOpacity: 0.035, color: "rgba(180, 160, 140, 0.3)", speed: 0.6 },
  { size: 420, bottom: "5%", right: "25%", baseOpacity: 0.02, color: "rgba(207, 168, 80, 0.3)", speed: 0.9 },
  { size: 200, top: "20%", left: "40%", baseOpacity: 0.02, color: "rgba(247, 231, 206, 0.25)", speed: 0.5 },
  { size: 700, top: "50%", left: "50%", baseOpacity: 0.015, color: "rgba(207, 168, 80, 0.2)", speed: 0.3 },
];

export default function AnimatedBackground() {
  const [reducedMotion, setReducedMotion] = useState(true);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const animateRef = useRef(null);

  const animate = useCallback(() => {
    if (!containerRef.current) return;
    const y = scrollRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const children = containerRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      const orb = ORBS[i];
      if (!orb) continue;
      const parallax = 0.015 + i * 0.006;
      const offsetX = (mx - 0.5) * (25 + i * 8) * orb.speed;
      const offsetY = (my - 0.5) * (20 + i * 6) * orb.speed;
      const scrollOffset = y * parallax * orb.speed;
      const intensity = 1 + 0.4 * (1 - Math.abs(mx - 0.5) * 2) * (1 - Math.abs(my - 0.5) * 2);
      el.style.transform = `translate(${offsetX}px, ${scrollOffset + offsetY}px) scale(${intensity})`;
    }
    rafRef.current = requestAnimationFrame(animateRef.current);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => { animateRef.current = animate; });

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => { scrollRef.current = window.scrollY; };
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animateRef.current);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            opacity: orb.baseOpacity,
            filter: "blur(60px)",
          }}
        />
      ))}
    </div>
  );
}
