"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

/**
 * Global smooth-scroll (Lenis). Adds buttery wheel inertia site-wide.
 * - Disabled entirely under prefers-reduced-motion (native scroll instead).
 * - Uses native scroll under the hood, so IntersectionObserver reveals and
 *   anchor links keep working; parallax hooks read window scroll as usual.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    /**
     * `lerp` rather than `duration`+`easing`: duration re-runs a ~1.1s ease from
     * the current position on every wheel tick, so continuous scrolling always
     * trails the cursor and reads as lag. lerp catches up a fixed fraction per
     * frame, which stays smooth but tracks the wheel closely.
     * Higher = snappier; 0.12 keeps the glide without the drag.
     */
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native scrolling on touch — mobile browsers already do this well, and
      // hijacking it costs a frame budget phones do not have.
      syncTouch: false,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);

  return <>{children}</>;
}
