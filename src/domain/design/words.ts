import type { Accent } from "./tone";

export type WordSegment = { text: string; accent?: Accent };

export type Word = { key: string; word: string; accent?: Accent };

export const toWords = (segments: readonly WordSegment[]): Word[] =>
  segments.flatMap((segment, segmentIndex) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word, wordIndex) => ({ key: `${segmentIndex}-${wordIndex}`, word, accent: segment.accent })),
  );

export const twoTone = (lead: string, highlight: string, accent: Accent = "fog"): WordSegment[] => [
  { text: lead },
  { text: highlight, accent },
];
