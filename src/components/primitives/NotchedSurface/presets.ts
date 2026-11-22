import type { Notch } from "./notchMask";

export const NOTCHES = {
  ticket: [
    { edge: "top", at: "82%", kind: "valley" },
    { edge: "bottom", at: "10%", mirror: true },
  ],
  tab: [
    { edge: "top", at: "90%" },
    { edge: "bottom", at: "40%", mirror: true },
  ],
  side: [
    { edge: "right", at: "38%" },
    { edge: "bottom", at: "42%", mirror: true },
  ],
  photo: [
    { edge: "top", at: "36%" },
    { edge: "bottom", at: "72%", mirror: true },
  ],
  portrait: [
    { edge: "left", at: "30%" },
    { edge: "right", at: "72%", mirror: true },
  ],
  banner: [
    { edge: "top", at: "50%", kind: "valley" },
    { edge: "left", at: "28%" },
    { edge: "right", at: "78%", mirror: true },
  ],
  stat: [
    { edge: "top", at: "88%", kind: "valley" },
    { edge: "bottom", at: "20%", mirror: true },
  ],
} as const satisfies Record<string, readonly Notch[]>;

export type NotchPreset = keyof typeof NOTCHES;
