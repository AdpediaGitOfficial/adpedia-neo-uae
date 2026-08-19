"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ContactModal } from "@/components/ui/ContactModal";

type ContactModalContextValue = {
  openContactModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

/**
 * Hosts the quick-contact modal once at the root and exposes `openContactModal`
 * to anything beneath it — the header's desktop CTA and the mobile menu's CTA
 * are siblings, so lifting the open state into a provider avoids prop-drilling
 * it between them.
 */
export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openContactModal = useCallback(() => setOpen(true), []);
  const closeContactModal = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openContactModal }), [openContactModal]);

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={open} onClose={closeContactModal} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal(): ContactModalContextValue {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used within a ContactModalProvider");
  return ctx;
}
