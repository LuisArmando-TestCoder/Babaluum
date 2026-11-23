export type StatParts = { prefix: string; amount: number; decimals: number; suffix: string };

const PATTERN = /^(\D*?)(\d+(?:\.(\d+))?)(\D*)$/;

export const parseStat = (value: string): StatParts | null => {
  const match = PATTERN.exec(value.trim());
  if (!match) return null;
  const [, prefix = "", amount = "0", fraction = "", suffix = ""] = match;
  return { prefix, amount: Number(amount), decimals: fraction.length, suffix };
};

export const formatStat = ({ prefix, decimals, suffix }: StatParts, amount: number): string =>
  `${prefix}${amount.toFixed(decimals)}${suffix}`;
