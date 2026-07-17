"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animate as a staggered container whose Reveal children animate in sequence. */
  as?: "div" | "section" | "ul" | "li" | "span";
};

/**
 * Scroll-triggered fade-up. Respects prefers-reduced-motion (renders static).
 * One-shot (viewport once) so content doesn't re-animate on scroll-back.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
    },
  };

  return (
    <MotionTag
      data-reveal
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
