"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import {
  ServiceMegaPanel,
  PortfolioMegaPanel,
  BlogMegaPanel,
} from "@/components/layout/MegaMenuPanels";
import { mainNav, type MegaKey } from "@/lib/site";
import { cn } from "@/lib/utils";

const CLOSE_DELAY = 140; // ms — grace period so moving cursor into the panel never flickers

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<MegaKey | null>(null);
  /**
   * Flips true the first time a mega menu opens and never resets. The panels
   * stay mounted so their links ship in the HTML, but their thumbnails are held
   * back until the menu is actually used — otherwise every page load fetches
   * and decodes them for a menu most visitors never open.
   */
  const [menuPrimed, setMenuPrimed] = useState(false);
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
      setMenuPrimed(true);
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
        "fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-colors duration-300",
        solid ? "bg-ink/90 backdrop-blur-md" : "bg-transparent"
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
                  // The label navigates and the + toggles the panel. A single
                  // control cannot do both: as a button it could never reach
                  // /services, and as a link keyboard users could not open the
                  // menu. Hovering anywhere on the item still opens it.
                  <li
                    key={item.href}
                    onMouseEnter={() => openMenu(item.mega!)}
                    className="flex items-center gap-2"
                  >
                    <Link
                      href={item.href}
                      onFocus={() => openMenu(item.mega!)}
                      className={cn(
                        "mono-label py-2 text-[0.9rem] tracking-[0.1em] text-white/80 transition-colors hover:text-white",
                        (isOpen || activePath) && "text-white"
                      )}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls="mega-menu-panel"
                      aria-haspopup="menu"
                      aria-label={`${isOpen ? "Hide" : "Show"} ${item.label} menu`}
                      onFocus={() => openMenu(item.mega!)}
                      onClick={() => (isOpen ? closeNow() : openMenu(item.mega!))}
                      className="py-2 text-white/80 transition-colors hover:text-white"
                    >
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
        {(["service", "portfolio", "blog"] as const).map((key) => {
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
                  <ServiceMegaPanel onNavigate={closeNow} showMedia={menuPrimed} />
                ) : key === "portfolio" ? (
                  <PortfolioMegaPanel onNavigate={closeNow} showMedia={menuPrimed} />
                ) : (
                  <BlogMegaPanel onNavigate={closeNow} showMedia={menuPrimed} />
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
