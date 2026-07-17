"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Positive = moves slower than scroll (recedes). Keep subtle (0.04–0.12). */
  speed?: number;
  /** For object-cover images: adds a base scale so translation never reveals edges. */
  cover?: boolean;
};

/**
 * Subtle scroll parallax. Translates its child as it passes through the viewport.
 * Reads window scroll (Lenis dispatches native scroll), rAF-throttled.
 * No-op under prefers-reduced-motion.
 */
export function Parallax({ children, className, speed = 0.08, cover = false }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const scale = cover ? 1.16 : 1;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = -(center * speed);
      el.style.transform =
        `translate3d(0, ${offset.toFixed(1)}px, 0)` + (scale !== 1 ? ` scale(${scale})` : "");
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce, speed, cover]);

  return (
    <div ref={ref} className={cn(className)} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
