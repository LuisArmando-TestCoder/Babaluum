import { isEmail } from "../forms/email";

export const CONTACT_FIELDS = ["name", "email", "phone", "subject", "message"] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

export type ContactMessage = Record<ContactField, string>;

export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactValidation = { ok: true; message: ContactMessage } | { ok: false; errors: ContactErrors };

const PHONE = /^[+\d][\d\s().-]{6,}$/;
const LIMITS: Record<ContactField, number> = { name: 120, email: 160, phone: 40, subject: 160, message: 4000 };

const text = (value: unknown, limit: number): string => (typeof value === "string" ? value.trim().slice(0, limit) : "");

const readMessage = (input: Partial<Record<ContactField, unknown>>): ContactMessage => ({
  name: text(input.name, LIMITS.name),
  email: text(input.email, LIMITS.email),
  phone: text(input.phone, LIMITS.phone),
  subject: text(input.subject, LIMITS.subject),
  message: text(input.message, LIMITS.message),
});

const RULES: ReadonlyArray<{ field: ContactField; failsFor: (message: ContactMessage) => boolean; error: string }> = [
  { field: "name", failsFor: ({ name }) => name.length < 2, error: "Escribe tu nombre completo." },
  { field: "email", failsFor: ({ email }) => !isEmail(email), error: "Escribe un correo válido, como nombre@correo.com." },
  { field: "phone", failsFor: ({ phone }) => phone !== "" && !PHONE.test(phone), error: "Revisa el teléfono: usa solo números, espacios o +." },
  { field: "message", failsFor: ({ message }) => message.length < 10, error: "Cuéntanos un poco más (mínimo 10 caracteres)." },
];

export const validateContact = (input: Partial<Record<ContactField, unknown>>): ContactValidation => {
  const message = readMessage(input);
  const failed = RULES.filter((rule) => rule.failsFor(message));
  if (failed.length === 0) return { ok: true, message };
  return { ok: false, errors: Object.fromEntries(failed.map((rule) => [rule.field, rule.error])) };
};

export const toMailto = (recipient: string, { name, phone, subject, message }: ContactMessage): string => {
  const signature = [name, phone].filter(Boolean).join(" · ");
  const query = new URLSearchParams({ subject: subject || "Hola Babaluum", body: `${message}\n\n${signature}` });
  return `mailto:${recipient}?${query.toString().replace(/\+/g, "%20")}`;
};
