import { describe, expect, it } from "vitest";
import { toMailto, validateContact } from "./message";

const VALID = { name: "Lucía Rojas", email: "lucia@correo.com", phone: "+506 8888 0000", subject: "Hola", message: "Quiero sumarme a un programa." };

describe("validateContact", () => {
  it("accepts a complete message and trims it", () => {
    const result = validateContact({ ...VALID, name: "  Lucía Rojas  " });
    expect(result).toEqual({ ok: true, message: VALID });
  });

  it("lets phone and subject stay empty", () => {
    expect(validateContact({ ...VALID, phone: "", subject: "" }).ok).toBe(true);
  });

  it("reports every failing field with a fix", () => {
    const result = validateContact({ name: "L", email: "lucia@", phone: "abc", message: "corto" });
    expect(result.ok).toBe(false);
    expect(result.ok ? [] : Object.keys(result.errors).sort()).toEqual(["email", "message", "name", "phone"]);
  });

  it("ignores values that are not text", () => {
    const result = validateContact({ ...VALID, message: 42 });
    expect(result.ok ? {} : result.errors).toHaveProperty("message");
  });

  it("caps very long input", () => {
    const result = validateContact({ ...VALID, message: "a".repeat(9000) });
    expect(result.ok && result.message.message.length).toBe(4000);
  });
});

describe("toMailto", () => {
  it("builds an encoded mailto link", () => {
    const link = toMailto("hola@babaluum.com", VALID);
    expect(link.startsWith("mailto:hola@babaluum.com?subject=Hola&body=Quiero%20sumarme")).toBe(true);
    expect(link).toContain("Luc%C3%ADa%20Rojas");
  });
});
