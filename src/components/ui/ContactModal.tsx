"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { quickContactModal, serviceOptions } from "@/lib/contact-content";
import {
  emptyQuickContact as empty,
  validateQuickContact as validate,
  MAX_MESSAGE_LENGTH,
  type QuickContactValues as Values,
  type QuickContactErrors as Errors,
} from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

const { fields } = quickContactModal;

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState(quickContactModal.error);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Reset to a blank form each time the modal is reopened, so a prior
  // success/error state never lingers into the next enquiry.
  useEffect(() => {
    if (!open) return;
    setValues(empty);
    setErrors({});
    setStatus("idle");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const set = (key: keyof Values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        if (payload?.errors) setErrors(payload.errors);
        setServerError(typeof payload?.error === "string" ? payload.error : quickContactModal.error);
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setServerError(quickContactModal.error);
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] grid place-items-center overflow-y-auto bg-black/70 p-4 py-10 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[34rem] border border-white/10 bg-ink-800 p-8 sm:p-10"
          >
            <IconButton
              ref={closeRef}
              size="md"
              variant="ghost"
              label="Close"
              onClick={onClose}
              className="absolute right-4 top-4"
            >
              <X className="h-5 w-5" aria-hidden />
            </IconButton>

            <Eyebrow>{quickContactModal.eyebrow}</Eyebrow>
            <Heading
              as="h2"
              id="contact-modal-heading"
              size="sm"
              weight="light"
              balance={false}
              className="mt-3"
            >
              {quickContactModal.title}
            </Heading>
            <Text size="body-sm" className="mt-3">
              {quickContactModal.intro}
            </Text>

            <form noValidate onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <Field label={fields.name.label} htmlFor="modal-name" hideLabel error={errors.name}>
                <Input
                  id="modal-name"
                  name="name"
                  autoComplete="name"
                  placeholder={fields.name.placeholder}
                  value={values.name}
                  onChange={set("name")}
                  invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "modal-name-error" : undefined}
                />
              </Field>

              <Field label={fields.email.label} htmlFor="modal-email" hideLabel error={errors.email}>
                <Input
                  id="modal-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={fields.email.placeholder}
                  value={values.email}
                  onChange={set("email")}
                  invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "modal-email-error" : undefined}
                />
              </Field>

              <Field label={fields.phone.label} htmlFor="modal-phone" hideLabel error={errors.phone}>
                <Input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder={fields.phone.placeholder}
                  value={values.phone}
                  onChange={set("phone")}
                  invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "modal-phone-error" : undefined}
                />
              </Field>

              <Field label={fields.service.label} htmlFor="modal-service" hideLabel>
                <Select id="modal-service" name="service" value={values.service} onChange={set("service")}>
                  <option value="">{fields.service.placeholder}</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label={fields.message.label} htmlFor="modal-message" hideLabel error={errors.message}>
                <Textarea
                  id="modal-message"
                  name="message"
                  rows={3}
                  maxLength={MAX_MESSAGE_LENGTH}
                  placeholder={fields.message.placeholder}
                  value={values.message}
                  onChange={set("message")}
                  invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "modal-message-error" : undefined}
                />
              </Field>

              <Button type="submit" size="lg" className="mt-1 w-full" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : quickContactModal.submit}
              </Button>

              <div aria-live="polite">
                {status === "success" ? (
                  <Text size="body-sm" className="text-center">
                    {quickContactModal.success}
                  </Text>
                ) : null}
                {status === "error" ? (
                  <Text size="body-sm" danger className="text-center">
                    {serverError}
                  </Text>
                ) : null}
              </div>

              {status === "success" ? null : (
                <Text size="caption" tone="muted" className="text-center">
                  {quickContactModal.footnote}
                </Text>
              )}
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
