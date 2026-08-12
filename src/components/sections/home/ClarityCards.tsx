"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Title, Text } from "@/components/ui/typography";
import { clarityContent } from "@/lib/home-content";

const cards = clarityContent.cards;
const GAP = 16;

function ClarityCard({ image, title, body }: { image: string; title: string; body: string }) {
  return (
    <Card as="article" padding="sm" className="flex items-center gap-5">
      <div className="relative h-[132px] w-[132px] shrink-0 overflow-hidden bg-ink">
        <Image src={image} alt="" fill sizes="132px" className="object-cover" />
      </div>
      <div>
        <Title as="h3" size="sm" weight="medium">
          {title}
        </Title>
        <Text className="mt-2">{body}</Text>
      </div>
    </Card>
  );
}

/**
 * Three cards. Technology (middle) is anchored; Conversion spreads up and
 * Creativity spreads down from behind it as the section scrolls into view.
 * Scroll-scrubbed via framer-motion; static stack under reduced motion.
 */
export function ClarityCards() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);
  const [spread, setSpread] = useState(200);

  useEffect(() => {
    const measure = () => {
      if (middleRef.current) setSpread(middleRef.current.offsetHeight + GAP);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.35"],
  });

  const upY = useTransform(scrollYProgress, [0, 1], [spread, 0]);
  const downY = useTransform(scrollYProgress, [0, 1], [-spread, 0]);
  const sideOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0.45, 1]);

  if (reduce) {
    return (
      <div className="flex flex-col gap-4">
        {cards.map((c) => (
          <ClarityCard key={c.title} {...c} />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-4">
      <motion.div style={{ y: upY, opacity: sideOpacity }} className="relative z-0">
        <ClarityCard {...cards[0]} />
      </motion.div>
      <div ref={middleRef} className="relative z-10">
        <ClarityCard {...cards[1]} />
      </div>
      <motion.div style={{ y: downY, opacity: sideOpacity }} className="relative z-0">
        <ClarityCard {...cards[2]} />
      </motion.div>
    </div>
  );
}
