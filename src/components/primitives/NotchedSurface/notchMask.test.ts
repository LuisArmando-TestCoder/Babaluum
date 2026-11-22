import { describe, expect, it } from "vitest";
import { notchMask } from "./notchMask";

describe("notchMask", () => {
  it("returns nothing for a plain surface", () => {
    expect(notchMask([])).toBeUndefined();
  });

  it("emits one cutter layer per notch plus the solid base", () => {
    const mask = notchMask([
      { edge: "top", at: "80%" },
      { edge: "bottom", at: "12%", kind: "valley" },
    ]);
    expect(mask?.maskImage.split("url(").length).toBe(3);
    expect(mask?.maskImage.endsWith("linear-gradient(#000 0 0)")).toBe(true);
    expect(mask?.maskPosition).toBe("80% 0, 12% 100%, 0 0");
    expect(mask?.maskComposite).toBe("exclude, exclude, add");
  });

  it("swaps the cutter box for vertical edges", () => {
    const mask = notchMask([{ edge: "right", at: "40%" }]);
    expect(mask?.maskSize.startsWith("calc(40px")).toBe(true);
  });
});
