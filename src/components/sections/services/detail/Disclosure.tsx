"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Title } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export type DisclosureItem = {
  /** Stable key, and the seed for the row's element ids. */
  id: string;
  label: string;
  /**
   * Absent when the comp never wrote this row's panel. Such a row renders inert
   * rather than as a dead toggle — see the note on the component below.
   */
  content?: React.ReactNode;
};

/**
 * The shared disclosure list behind the DevOps page's accordions (the technology
 * stack and the engagement models). Both draw the same control with different
 * panel contents, so the behaviour, the ARIA wiring, and the one rule that is
 * easy to get wrong all live here once.
 *
 * **That rule:** the DevOps comp routinely details only the *first* row of an
 * accordion and leaves the rest as bare labels. A row with no `content` is
 * therefore rendered as a plain row, not a button — a button there would
 * advertise `aria-expanded` on a control that toggles nothing and point
 * `aria-controls` at an element that never exists. Supplying the copy makes the
 * row interactive on its own, with no change here.
 *
 * Rows are sharp-cornered with hairline separators; the comp's rounded cards and
 * drop shadows are normalised away, as on every other section.
 */
export function DisclosureList({
  items,
  idPrefix,
  surface = "dark",
  defaultOpen = 0,
  dot = false,
  className,
}: {
  items: DisclosureItem[];
  /** Namespaces the generated element ids so two lists can share a page. */
  idPrefix: string;
  surface?: "dark" | "light";
  /** Index open on first paint; the comp opens the first row. */
  defaultOpen?: number;
  /** The engagement-model rows carry a small leading dot; the tool rows don't. */
  dot?: boolean;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const reduce = useReducedMotion();

  const line = surface === "light" ? "border-ink/10" : "border-white/10";
  const muted = surface === "light" ? "text-ink/45" : "text-white/45";
  const dotColor = surface === "light" ? "bg-accent-600" : "bg-accent-400";

  return (
    <ul className={cn("list-none", className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `${idPrefix}-panel-${i}`;
        const btnId = `${idPrefix}-btn-${i}`;
        const inner = (
          <>
            {dot ? (
              <span aria-hidden className={cn("h-2 w-2 shrink-0 rounded-full", dotColor)} />
            ) : null}
            <Title as="span" size="sm" weight="medium" surface={surface} className="flex-1">
              {item.label}
            </Title>
            {item.content ? (
              <span aria-hidden className={cn("shrink-0", muted)}>
                {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </span>
            ) : null}
          </>
        );

        return (
          <li key={item.id} className={cn(i > 0 && "border-t", i > 0 && line)}>
            <h3>
              {item.content ? (
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  // Only while the panel is actually mounted. The panel is
                  // conditionally rendered, so a permanent `aria-controls` would
                  // dangle on every collapsed row — pointing assistive tech at an
                  // id that is not in the document. `aria-expanded` alone is a
                  // complete disclosure contract when the panel is absent.
                  aria-controls={isOpen ? panelId : undefined}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-5 py-7 text-left"
                >
                  {inner}
                </button>
              ) : (
                <span className="flex w-full items-center gap-5 py-7 text-left">{inner}</span>
              )}
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && item.content ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-9">{item.content}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
