"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { clarityContent } from "@/lib/home-content";

const ROTATE_MS = 3800;
const cards = clarityContent.cards;

export function ClarityCards() {
  const reduce = useReducedMotion();
  // `order` holds card indices; order[0] is the front card.
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setOrder((prev) => [...prev.slice(1), prev[0]]);
  }, []);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(advance, ROTATE_MS);
    return () => clearInterval(id);
  }, [advance, reduce, paused]);

  return (
    <div
      className="relative mx-auto h-[340px] w-full max-w-lg lg:mx-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-label="What we bring together"
    >
      {order.map((cardIndex, pos) => {
        const card = cards[cardIndex];
        const isFront = pos === 0;
        return (
          <motion.article
            key={card.title}
            aria-hidden={!isFront}
            className="absolute inset-x-0 top-0 origin-top overflow-hidden rounded-card border border-white/10 bg-ink-800"
            animate={{
              y: pos * 16,
              scale: 1 - pos * 0.04,
              opacity: pos > 2 ? 0 : 1 - pos * 0.15,
              zIndex: cards.length - pos,
            }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ pointerEvents: isFront ? "auto" : "none" }}
          >
            <div className="flex items-stretch gap-5 p-4">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center pr-2">
                <h3 className="text-lg font-medium text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{card.body}</p>
              </div>
            </div>
          </motion.article>
        );
      })}

      {/* progress dots */}
      <div className="absolute -bottom-2 left-4 flex gap-1.5">
        {cards.map((c, i) => (
          <button
            key={c.title}
            type="button"
            aria-label={`Show ${c.title}`}
            aria-current={order[0] === i}
            onClick={() => setOrder([...cards.map((_, k) => k).slice(i), ...cards.map((_, k) => k).slice(0, i)])}
            className={`h-1.5 rounded-full transition-all ${
              order[0] === i ? "w-5 bg-accent-400" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
