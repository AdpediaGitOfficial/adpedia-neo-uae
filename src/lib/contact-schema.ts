/**
 * Shared contact-enquiry shape and validation.
 * Imported by both the client form and the API route so the two can't drift —
 * the client validation is UX, the server validation is the real gate.
 */

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const emptyContact: ContactValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

/** Generous cap — long enough for a real brief, short enough to reject junk. */
export const MAX_MESSAGE_LENGTH = 5000;
const MAX_FIELD_LENGTH = 200;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: Partial<ContactValues>): ContactErrors {
  const errors: ContactErrors = {};
  const name = (values.name ?? "").trim();
  const email = (values.email ?? "").trim();
  const company = (values.company ?? "").trim();
  const message = (values.message ?? "").trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > MAX_FIELD_LENGTH) errors.name = "That name is too long.";

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email) || email.length > MAX_FIELD_LENGTH)
    errors.email = "Please enter a valid email address.";

  if (!company) errors.company = "Please enter your company.";
  else if (company.length > MAX_FIELD_LENGTH) errors.company = "That company name is too long.";

  if (!message) errors.message = "Please tell us about your project.";
  else if (message.length > MAX_MESSAGE_LENGTH) errors.message = "That message is too long.";

  return errors;
}

/**
 * Lighter shape for the quick-contact modal opened from the site's "Book a
 * call" CTA — phone instead of company, no full-page context. Kept separate
 * from `ContactValues` rather than making fields optional on one shared type,
 * so each form's required fields stay unambiguous.
 */
export type QuickContactValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type QuickContactErrors = Partial<Record<keyof QuickContactValues, string>>;

export const emptyQuickContact: QuickContactValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const PHONE_RE = /^[0-9+()\-\s]{7,20}$/;

export function validateQuickContact(values: Partial<QuickContactValues>): QuickContactErrors {
  const errors: QuickContactErrors = {};
  const name = (values.name ?? "").trim();
  const email = (values.email ?? "").trim();
  const phone = (values.phone ?? "").trim();
  const message = (values.message ?? "").trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > MAX_FIELD_LENGTH) errors.name = "That name is too long.";

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email) || email.length > MAX_FIELD_LENGTH)
    errors.email = "Please enter a valid email address.";

  if (!phone) errors.phone = "Please enter your phone number.";
  else if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";

  if (!message) errors.message = "Please tell us about your project.";
  else if (message.length > MAX_MESSAGE_LENGTH) errors.message = "That message is too long.";

  return errors;
}
