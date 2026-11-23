import { describe, expect, it } from "vitest";
import { validateSubscription } from "./subscription";

describe("validateSubscription", () => {
  it("accepts an email and normalises it", () => {
    expect(validateSubscription({ email: "  Lucia@Correo.com " })).toEqual({ ok: true, subscription: { email: "lucia@correo.com", name: "", interest: "general" } });
  });

  it("keeps a known interest", () => {
    const result = validateSubscription({ email: "lucia@correo.com", interest: "escritores" });
    expect(result.ok && result.subscription.interest).toBe("escritores");
  });

  it("falls back to the general list for an unknown interest", () => {
    const result = validateSubscription({ email: "lucia@correo.com", interest: "otro" });
    expect(result.ok && result.subscription.interest).toBe("general");
  });

  it("keeps a trimmed name when one is given", () => {
    const result = validateSubscription({ email: "lucia@correo.com", name: "  Lucía " });
    expect(result.ok && result.subscription.name).toBe("Lucía");
  });

  it("rejects a missing or malformed email with a fix", () => {
    expect(validateSubscription({})).toEqual({ ok: false, error: "Escribe un correo válido, como nombre@correo.com." });
    expect(validateSubscription({ email: "lucia@correo" }).ok).toBe(false);
  });
});
