import { describe, expect, it } from "vitest";
import { cueFor, rateFor, rateForStep } from "./control";
import { CUES, CUE_NAMES } from "./cues";
import { vary } from "./variation";

describe("cueFor", () => {
  it("plays a press on the way down and a release on the way up", () => {
    expect(cueFor({}, "down")).toBe("press");
    expect(cueFor({}, "up")).toBe("release");
  });

  it("stays silent for controls that opt out", () => {
    expect(cueFor({ sound: "none" }, "down")).toBeNull();
    expect(cueFor({ sound: "none" }, "up")).toBeNull();
  });

  it("announces what a disclosure is about to do", () => {
    expect(cueFor({ expanded: "false" }, "up")).toBe("open");
    expect(cueFor({ expanded: "true" }, "up")).toBe("close");
  });

  it("lets a control name its own cue and ignores unknown names", () => {
    expect(cueFor({ sound: "step" }, "up")).toBe("step");
    expect(cueFor({ sound: "kazoo" }, "up")).toBe("release");
  });
});

describe("rates", () => {
  it("reads a rate and keeps it in a comfortable range", () => {
    expect(rateFor({ rate: "1.24" })).toBe(1.24);
    expect(rateFor({ rate: "9" })).toBe(2);
    expect(rateFor({ rate: "nope" })).toBe(1);
    expect(rateFor({})).toBe(1);
  });

  it("rises with each step", () => {
    expect(rateForStep(0)).toBe(1);
    expect(rateForStep(3)).toBeCloseTo(1.36);
  });
});

describe("voices", () => {
  it("keeps every cue short and quiet", () => {
    for (const name of CUE_NAMES) {
      for (const voice of CUES[name]) {
        expect(voice.gain).toBeLessThanOrEqual(0.06);
        expect((voice.delay ?? 0) + voice.duration).toBeLessThanOrEqual(0.3);
      }
    }
  });

  it("varies pitch around the requested rate without changing length", () => {
    const [voice] = CUES.press;
    if (!voice) throw new Error("press cue has no voice");
    expect(vary(voice, { rate: 1, jitter: 0.5 })).toEqual(voice);
    const higher = vary(voice, { rate: 2, jitter: 1 });
    expect(higher.from).toBeCloseTo(voice.from * 2.06);
    expect(higher.duration).toBe(voice.duration);
  });
});
