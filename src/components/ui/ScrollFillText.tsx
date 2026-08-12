"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Opacity on white text over a dark bg reads as muted-grey → white.
  const opacity = useTransform(progress, range, [0.26, 1]);
  return (
    <motion.span style={{ opacity }} className="text-white">
      {children}{" "}
    </motion.span>
  );
}

/**
 * Paragraph that fills from muted grey to white word-by-word as it scrolls
 * through the viewport. Renders solid white under reduced motion.
 */
export function ScrollFillText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.3"],
  });

  if (reduce) {
    return <p className={cn("text-white", className)}>{text}</p>;
  }

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
