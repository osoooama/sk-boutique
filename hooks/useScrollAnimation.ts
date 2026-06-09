"use client";

import { useEffect, useRef, useCallback } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  /** Animation class to add when element enters viewport. Default: animate-fade-in */
  animationClass?: string;
}

export default function useScrollAnimation(
  selector = "[data-reveal]",
  options: ScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px", animationClass = "animate-fade-in" } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    document.querySelectorAll(selector).forEach((el) => observerRef.current?.observe(el));
  }, [selector, threshold, rootMargin, animationClass]);

  useEffect(() => {
    observe();
    return () => observerRef.current?.disconnect();
  }, [observe]);

  return { observe };
}
