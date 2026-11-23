import type { Notch } from "./notchMask";

export const NOTCHES = {
  ticket: [
    { edge: "top", at: "85%", kind: "valley" },
    { edge: "bottom", at: "12%" },
  ],
  tab: [
    { edge: "top", at: "85%", mirror: true },
    { edge: "bottom", at: "31%", mirror: true },
  ],
  stat: [
    { edge: "top", at: "78%" },
    { edge: "bottom", at: "29%", kind: "valley" },
  ],
  side: [
    { edge: "right", at: "28%", mirror: true },
    { edge: "bottom", at: "31%", mirror: true },
  ],
  chip: [
    { edge: "top", at: "76%", kind: "valley" },
    { edge: "bottom", at: "28%", mirror: true },
  ],
  photo: [
    { edge: "top", at: "30%", mirror: true },
    { edge: "bottom", at: "68%" },
  ],
  portrait: [
    { edge: "left", at: "22%", mirror: true },
    { edge: "bottom", at: "76%", mirror: true },
  ],
  frame: [
    { edge: "top", at: "32%" },
    { edge: "right", at: "55%" },
  ],
  banner: [
    { edge: "top", at: "83%", mirror: true },
    { edge: "left", at: "27%", mirror: true },
    { edge: "bottom", at: "50%", kind: "valley" },
  ],
  cta: [
    { edge: "top", at: "50%", kind: "valley" },
    { edge: "left", at: "19%", mirror: true },
    { edge: "right", at: "50%" },
  ],
  offer: [
    { edge: "top", at: "42%", mirror: true },
    { edge: "right", at: "44%", kind: "valley" },
    { edge: "bottom", at: "19%", mirror: true },
  ],
  review: [
    { edge: "right", at: "26%", mirror: true },
    { edge: "bottom", at: "50%", kind: "valley" },
  ],
  crest: [{ edge: "top", at: "84%", mirror: true }],
  crown: [{ edge: "top", at: "70%", kind: "valley" }],
  cover: [
    { edge: "top", at: "80%" },
    { edge: "left", at: "50%", kind: "valley" },
    { edge: "bottom", at: "22%", mirror: true },
  ],
  article: [
    { edge: "top", at: "80%" },
    { edge: "bottom", at: "22%", kind: "valley" },
  ],
  panel: [
    { edge: "top", at: "89%", mirror: true },
    { edge: "left", at: "60%", mirror: true },
    { edge: "right", at: "60%" },
  ],
} as const satisfies Record<string, readonly Notch[]>;

export type NotchPreset = keyof typeof NOTCHES;
