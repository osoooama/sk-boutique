"use client";

import { useEffect, useRef, useCallback } from "react";

export default function AnimatedBackground() {
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  const animate = useCallback(() => {
    if (!containerRef.current) return;
    const y = scrollRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const children = containerRef.current.children;
    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      const speed = 0.015 + i * 0.008;
      const offsetX = (mx - 0.5) * (20 + i * 10);
      const offsetY = (my - 0.5) * (15 + i * 8);
      el.style.transform = `translate(${offsetX}px, ${y * speed + offsetY}px)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  const orbs = [
    { size: 500, top: "8%", left: "3%", opacity: 0.035, color: "rgba(207, 168, 80, 0.5)" },
    { size: 350, top: "35%", right: "5%", opacity: 0.025, color: "rgba(180, 160, 130, 0.4)" },
    { size: 600, bottom: "15%", left: "10%", opacity: 0.03, color: "rgba(207, 168, 80, 0.35)" },
    { size: 280, top: "55%", right: "15%", opacity: 0.035, color: "rgba(160, 145, 120, 0.3)" },
    { size: 420, bottom: "5%", right: "25%", opacity: 0.02, color: "rgba(207, 168, 80, 0.3)" },
    { size: 200, top: "20%", left: "40%", opacity: 0.02, color: "rgba(140, 130, 115, 0.25)" },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {orbs.map((orb, i) => (
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
            opacity: orb.opacity,
            filter: "blur(60px)",
          }}
        />
      ))}
    </div>
  );
}
