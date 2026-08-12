"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";
import { Text } from "@/components/ui/typography";
import { contactForm, serviceOptions } from "@/lib/contact-content";
import {
  emptyContact as empty,
  validateContact as validate,
  MAX_MESSAGE_LENGTH,
  type ContactValues as Values,
  type ContactErrors as Errors,
} from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

const { fields } = contactForm;

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState(contactForm.error);

  const set = (key: keyof Values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
    // Clear a field's error as soon as the user edits it.
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
        // Surface the server's reason when it's actionable (rate limit, misconfig);
        // fall back to the generic copy otherwise.
        const payload = await response.json().catch(() => null);
        if (payload?.errors) setErrors(payload.errors);
        setServerError(typeof payload?.error === "string" ? payload.error : contactForm.error);
        setStatus("error");
        return;
      }

      setValues(empty);
      setStatus("success");
    } catch {
      setServerError(contactForm.error);
      setStatus("error");
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field label={fields.name.label} htmlFor="name" hideLabel error={errors.name}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          placeholder={fields.name.placeholder}
          value={values.name}
          onChange={set("name")}
          invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
      </Field>

      <Field label={fields.email.label} htmlFor="email" hideLabel error={errors.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={fields.email.placeholder}
          value={values.email}
          onChange={set("email")}
          invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
      </Field>

      <Field label={fields.company.label} htmlFor="company" hideLabel error={errors.company}>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder={fields.company.placeholder}
          value={values.company}
          onChange={set("company")}
          invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "company-error" : undefined}
        />
      </Field>

      <Field label={fields.service.label} htmlFor="service" hideLabel>
        <Select id="service" name="service" value={values.service} onChange={set("service")}>
          <option value="">{fields.service.placeholder}</option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Field>

      <Field label={fields.message.label} htmlFor="message" hideLabel error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder={fields.message.placeholder}
          value={values.message}
          onChange={set("message")}
          invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </Field>

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : contactForm.submit}
      </Button>

      <div aria-live="polite">
        {status === "success" ? <Text size="body-sm">{contactForm.success}</Text> : null}
        {status === "error" ? (
          <Text size="body-sm" danger>
            {serverError}
          </Text>
        ) : null}
      </div>
    </form>
  );
}
