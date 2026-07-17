"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 0.8;
const DISTANCE = 28;

type Tag = "div" | "section" | "ul" | "li" | "span" | "article" | "figure";

function hiddenFor(direction: RevealDirection, reduce: boolean) {
  if (reduce) return { opacity: 0 };
  switch (direction) {
    case "up":
      return { opacity: 0, y: DISTANCE };
    case "down":
      return { opacity: 0, y: -DISTANCE };
    case "left":
      return { opacity: 0, x: -36 };
    case "right":
      return { opacity: 0, x: 36 };
    case "scale":
      return { opacity: 0, y: 20, scale: 0.96 };
    default:
      return { opacity: 0 };
  }
}

function itemVariants(direction: RevealDirection, reduce: boolean, delay = 0): Variants {
  return {
    hidden: hiddenFor(direction, reduce),
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: reduce ? 0 : DURATION, ease: EASE, delay },
    },
  };
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  as?: Tag;
};

/** Single scroll-triggered reveal (fade + directional slide). One-shot. */
export function Reveal({ children, className, direction = "up", delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion() ?? false;
  const MotionTag = motion[as];
  return (
    <MotionTag
      data-reveal
      className={cn(className)}
      variants={itemVariants(direction, reduce, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child's reveal. */
  gap?: number;
  delay?: number;
  as?: Tag;
};

/**
 * Container whose <StaggerItem> children reveal in sequence as it enters view.
 * The container itself doesn't fade — only its items do.
 */
export function Stagger({ children, className, gap = 0.09, delay = 0, as = "div" }: StaggerProps) {
  const reduce = useReducedMotion() ?? false;
  const MotionTag = motion[as];
  const variants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : gap, delayChildren: reduce ? 0 : delay },
    },
  };
  return (
    <MotionTag
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

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDirection;
  as?: Tag;
};

/** A child of <Stagger>; inherits the sequenced timing from its parent. */
export function StaggerItem({ children, className, direction = "up", as = "div" }: StaggerItemProps) {
  const reduce = useReducedMotion() ?? false;
  const MotionTag = motion[as];
  return (
    <MotionTag data-reveal className={cn(className)} variants={itemVariants(direction, reduce)}>
      {children}
    </MotionTag>
  );
}
