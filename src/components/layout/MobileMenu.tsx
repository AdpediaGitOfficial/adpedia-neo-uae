"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { mainNav } from "@/lib/site";
import { useContactModal } from "@/components/providers/ContactModalProvider";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { openContactModal } = useContactModal();

  // Portal target (document.body) is only available on the client.
  useEffect(() => setMounted(true), []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scroll while open + close on Escape. The scroll root is
  // <html> (Lenis drives native scroll), so lock it there — locking only <body>
  // leaves the page scrollable behind the overlay on mobile.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prevHtml = html.style.overflow;
    const prevBody = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
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

      {/*
        Rendered through a portal to <body>, not inline. The header carries a
        `backdrop-blur` when scrolled, and a backdrop-filter makes its subtree the
        containing block for `position: fixed` — so an inline overlay would pin to
        the header (≈100px) instead of the viewport once the page is scrolled.
      */}
      {mounted
        ? createPortal(
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
                  className="fixed inset-0 z-[70] flex flex-col bg-ink lg:hidden"
                >
                  {/* Fixed bar so the close button stays reachable no matter how
                      tall the menu is or how short the screen (landscape, small
                      phones). Only the nav below scrolls. */}
                  <div className="flex h-[--header-height] shrink-0 items-center justify-between px-5">
                    <span className="mono-label text-white/60">Menu</span>
                    <IconButton size="md" variant="plain" label="Close menu" onClick={() => setOpen(false)}>
                      <X className="h-6 w-6" aria-hidden />
                    </IconButton>
                  </div>

                  <nav
                    aria-label="Mobile"
                    data-lenis-prevent
                    className="flex-1 overflow-y-auto overscroll-contain px-5 pt-2 pb-[calc(2.5rem+env(safe-area-inset-bottom))]"
                  >
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

                    <Button
                      size="lg"
                      className="mt-8 w-full"
                      onClick={() => {
                        setOpen(false);
                        openContactModal();
                      }}
                    >
                      Book a call
                    </Button>
                  </nav>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  );
}
