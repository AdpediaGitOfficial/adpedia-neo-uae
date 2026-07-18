"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { mainNav } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll while open + close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <IconButton
        size="md"
        variant="plain"
        label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" aria-hidden />
      </IconButton>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink"
          >
            <div className="flex h-[--header-height] items-center justify-between px-5">
              <span className="mono-label text-white/60">Menu</span>
              <IconButton size="md" variant="plain" label="Close menu" onClick={() => setOpen(false)}>
                <X className="h-6 w-6" aria-hidden />
              </IconButton>
            </div>

            <nav aria-label="Mobile" className="px-5 pt-6">
              <ul className="flex flex-col divide-y divide-white/10">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-display flex items-center justify-between py-5 text-2xl text-white"
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <ul className="-mt-2 flex flex-wrap gap-x-4 gap-y-1 pb-4">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="text-sm text-white/50">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>

              <Button href="/contact" size="lg" className="mt-8 w-full">
                Book a call
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
