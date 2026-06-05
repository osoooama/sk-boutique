"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const scrollRef = useRef(0);
  const orbsRef = useRef([]);

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      const y = scrollRef.current;
      orbsRef.current.forEach((orb, i) => {
        if (!orb) return;
        const speed = 0.02 + i * 0.005;
        orb.style.transform = `translateY(${y * speed}px)`;
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const orbs = [
    { size: 400, top: "10%", left: "5%", delay: "0s", duration: "18s", opacity: 0.04 },
    { size: 300, top: "30%", right: "10%", delay: "-4s", duration: "14s", opacity: 0.03 },
    { size: 500, bottom: "20%", left: "15%", delay: "-8s", duration: "20s", opacity: 0.035 },
    { size: 250, top: "60%", right: "20%", delay: "-2s", duration: "16s", opacity: 0.04 },
    { size: 350, bottom: "5%", right: "30%", delay: "-6s", duration: "22s", opacity: 0.025 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {orbs.map((orb, i) => (
        <div
          key={i}
          ref={(el) => { orbsRef.current[i] = el; }}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
            background: `radial-gradient(circle, rgba(207, 168, 80, 0.4) 0%, transparent 70%)`,
            opacity: orb.opacity,
            animation: `orb-float ${orb.duration} ease-in-out ${orb.delay} infinite alternate`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
