"use client";

import { useRef, useState, useEffect } from "react";

const LERP = 0.1;

export function useDeviceParallax() {
  const ref = useRef<HTMLDivElement>(null!);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const targetX = useRef(0);
  const targetY = useRef(0);
  const smoothX = useRef(0);
  const smoothY = useRef(0);
  const rafId = useRef(0);
  const isIOS = useRef(false);
  const usingDevice = useRef(false);
  const requested = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    isIOS.current = /iPad|iPhone|iPod/.test(navigator.userAgent);

    const onMouse = (e: MouseEvent) => {
      if (usingDevice.current) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      targetX.current = Math.max(-1, Math.min(1, ((e.clientX - (r.left + r.width / 2)) / (r.width / 2))));
      targetY.current = Math.max(-1, Math.min(1, ((e.clientY - (r.top + r.height / 2)) / (r.height / 2))));
    };

    const onMotion = (e: DeviceMotionEvent) => {
      usingDevice.current = true;
      const g = e.accelerationIncludingGravity;
      if (!g) return;
      targetX.current = Math.max(-1, Math.min(1, (g.x || 0) / 9.8));
      targetY.current = Math.max(-1, Math.min(1, (g.y || 0) / 9.8));
    };

    const requestMotion = async () => {
      if (requested.current) return;
      requested.current = true;
      if (typeof DeviceMotionEvent !== "undefined" && "requestPermission" in DeviceMotionEvent) {
        try {
          if (await (DeviceMotionEvent as any).requestPermission() === "granted") {
            window.addEventListener("devicemotion", onMotion);
          }
        } catch { /* */ }
      } else {
        window.addEventListener("devicemotion", onMotion);
      }
    };

    if (!isIOS.current) window.addEventListener("devicemotion", onMotion);
    if (isIOS.current) {
      const cb = () => requestMotion();
      document.addEventListener("touchstart", cb, { once: true });
      document.addEventListener("click", cb, { once: true });
    }

    window.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("devicemotion", onMotion);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tick = () => {
      smoothX.current += (targetX.current - smoothX.current) * LERP;
      smoothY.current += (targetY.current - smoothY.current) * LERP;

      const dx = Math.abs(smoothX.current - targetX.current);
      const dy = Math.abs(smoothY.current - targetY.current);

      if (dx > 0.001 || dy > 0.001) {
        setOffset({ x: smoothX.current, y: smoothY.current });
      } else if (smoothX.current !== 0 || smoothY.current !== 0) {
        smoothX.current = 0;
        smoothY.current = 0;
        setOffset({ x: 0, y: 0 });
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  return { ref, offset };
}
