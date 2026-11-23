import { describe, expect, it } from "vitest";
import { formatStat, parseStat } from "./stat";
import { toWords, twoTone } from "./words";

describe("parseStat", () => {
  it("splits prefix, number and suffix", () => {
    expect(parseStat("+1500")).toEqual({ prefix: "+", amount: 1500, decimals: 0, suffix: "" });
    expect(parseStat("2.5X")).toEqual({ prefix: "", amount: 2.5, decimals: 1, suffix: "X" });
    expect(parseStat("10M+")).toEqual({ prefix: "", amount: 10, decimals: 0, suffix: "M+" });
  });

  it("returns null for values that are not a single number", () => {
    expect(parseStat("Únete a nuestra red")).toBeNull();
    expect(parseStat("3 de 4")).toBeNull();
  });

  it("round-trips through formatStat", () => {
    for (const value of ["300+", "2.5X", "200%", "+1500", "$19"]) {
      const parts = parseStat(value);
      expect(parts && formatStat(parts, parts.amount)).toBe(value);
    }
  });
});

describe("toWords", () => {
  it("keeps each word's accent and gives stable keys", () => {
    const words = toWords(twoTone("Hola a todos", "en Babaluum"));
    expect(words.map((item) => item.word)).toEqual(["Hola", "a", "todos", "en", "Babaluum"]);
    expect(words[2]?.accent).toBeUndefined();
    expect(words[3]?.accent).toBe("fog");
    expect(new Set(words.map((item) => item.key)).size).toBe(5);
  });
});
