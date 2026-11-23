export const TONES = ["orange", "purple", "red", "lime", "green", "navy", "sky", "mist", "white"] as const;

export type Tone = (typeof TONES)[number];

export const ACCENTS = ["orange", "purple", "red", "lime", "green", "amber", "sky", "white", "navy", "fog", "slate"] as const;

export type Accent = (typeof ACCENTS)[number];
