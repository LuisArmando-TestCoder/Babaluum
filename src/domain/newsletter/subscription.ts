import { isEmail } from "../forms/email";

export const INTERESTS = ["general", "escritores", "studio"] as const;

export type Interest = (typeof INTERESTS)[number];

export type Subscription = { email: string; name: string; interest: Interest };

export type SubscriptionValidation = { ok: true; subscription: Subscription } | { ok: false; error: string };

type SubscriptionInput = { email?: unknown; name?: unknown; interest?: unknown };

const EMAIL_LIMIT = 160;
const NAME_LIMIT = 80;

const readName = (value: unknown): string => (typeof value === "string" ? value.trim().slice(0, NAME_LIMIT) : "");

const readInterest = (value: unknown): Interest => INTERESTS.find((interest) => interest === value) ?? "general";

export const validateSubscription = ({ email, name, interest }: SubscriptionInput): SubscriptionValidation => {
  const address = typeof email === "string" ? email.trim().toLowerCase().slice(0, EMAIL_LIMIT) : "";
  if (!isEmail(address)) return { ok: false, error: "Escribe un correo válido, como nombre@correo.com." };
  return { ok: true, subscription: { email: address, name: readName(name), interest: readInterest(interest) } };
};
