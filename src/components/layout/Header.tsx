"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ServiceMegaPanel, PortfolioMegaPanel } from "@/components/layout/MegaMenuPanels";
import { mainNav, type MegaKey } from "@/lib/site";
import { cn } from "@/lib/utils";

const CLOSE_DELAY = 140; // ms — grace period so moving cursor into the panel never flickers

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<MegaKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mega menu on navigation.
  useEffect(() => {
    setActive(null);
  }, [pathname]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(
    (key: MegaKey) => {
      cancelClose();
      setActive(key);
    },
    [cancelClose]
  );

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setActive(null), CLOSE_DELAY);
  }, [cancelClose]);

  const closeNow = useCallback(() => {
    cancelClose();
    setActive(null);
  }, [cancelClose]);

  // Escape closes; clean up any pending timer on unmount.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeNow();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      cancelClose();
    };
  }, [closeNow, cancelClose]);

  const solid = scrolled || active !== null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "border-b border-white/10 bg-ink/90 backdrop-blur-md" : "bg-transparent"
      )}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeNow();
      }}
    >
      <Container className="flex h-[--header-height] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Adpedia Neo — home"
          className="relative z-10 shrink-0"
          onMouseEnter={closeNow}
        >
          <Image
            src="/images/brand/logo-white.png"
            alt="Adpedia Neo"
            width={172}
            height={50}
            priority
            className="h-7 w-auto md:h-8"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => {
              const activePath = pathname === item.href || pathname.startsWith(item.href + "/");

              if (item.mega) {
                const isOpen = active === item.mega;
                return (
                  <li key={item.href} onMouseEnter={() => openMenu(item.mega!)}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls="mega-menu-panel"
                      aria-haspopup="menu"
                      onFocus={() => openMenu(item.mega!)}
                      onClick={() => (isOpen ? closeNow() : openMenu(item.mega!))}
                      className={cn(
                        "mono-label flex items-center gap-2 py-2 text-[0.9rem] tracking-[0.1em] text-white/80 transition-colors hover:text-white",
                        isOpen && "text-white"
                      )}
                    >
                      {item.label}
                      <Plus
                        className={cn(
                          "h-4 w-4 transition-transform duration-300 ease-out-expo motion-reduce:transition-none",
                          isOpen && "rotate-[135deg]"
                        )}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.href} onMouseEnter={closeNow}>
                  <Link
                    href={item.href}
                    className={cn(
                      "mono-label py-2 text-[0.9rem] tracking-[0.1em] text-white/80 transition-colors hover:text-white",
                      activePath && "text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3" onMouseEnter={closeNow}>
          <Button href="/contact" className="hidden sm:inline-flex">
            Book a call
          </Button>
          <MobileMenu />
        </div>
      </Container>

      {/* Mega menu region — panels stay mounted (crawlable); visibility toggles per active key. */}
      <div
        id="mega-menu-panel"
        role="region"
        aria-label="Menu"
        className="absolute inset-x-0 top-full hidden lg:block"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        {(["service", "portfolio"] as const).map((key) => {
          const isOpen = active === key;
          return (
            <div
              key={key}
              aria-hidden={!isOpen}
              className={cn(
                "absolute inset-x-0 top-0 border-t border-white/10 bg-ink-800 shadow-2xl shadow-black/50 transition-all duration-200 ease-out-expo motion-reduce:transition-none",
                isOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              )}
            >
              <Container className="py-11">
                {key === "service" ? (
                  <ServiceMegaPanel onNavigate={closeNow} />
                ) : (
                  <PortfolioMegaPanel onNavigate={closeNow} />
                )}
              </Container>
            </div>
          );
        })}
      </div>

      {/* Backdrop — dims the page and closes the menu when the cursor moves off the nav/panel. */}
      <div
        aria-hidden
        onMouseEnter={scheduleClose}
        onClick={closeNow}
        className={cn(
          "fixed inset-x-0 top-[--header-height] bottom-0 -z-10 hidden bg-black/50 transition-opacity duration-200 lg:block",
          active ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
    </header>
  );
}
