import { SHELL_DARK, SHELL_LIGHT, SHELL_MID, VIOLET, VIOLET_DEEP, VIOLET_LIGHT } from "../palette";

export type RobotPaint = { shell: string; violet: string; sheen: string };

export const RobotDefs = ({ ids }: { ids: RobotPaint }) => (
  <defs>
    <linearGradient id={ids.shell} x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stopColor={SHELL_LIGHT} />
      <stop offset="0.55" stopColor={SHELL_MID} />
      <stop offset="1" stopColor={SHELL_DARK} />
    </linearGradient>
    <linearGradient id={ids.violet} x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stopColor={VIOLET_LIGHT} />
      <stop offset="0.5" stopColor={VIOLET} />
      <stop offset="1" stopColor={VIOLET_DEEP} />
    </linearGradient>
    <radialGradient id={ids.sheen} cx="0.3" cy="0.22" r="0.6">
      <stop offset="0" stopColor={SHELL_LIGHT} stopOpacity="0.95" />
      <stop offset="1" stopColor={SHELL_LIGHT} stopOpacity="0" />
    </radialGradient>
  </defs>
);
