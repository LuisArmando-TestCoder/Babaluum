import { cx } from "@/domain/design/cx";
import type { IconName } from "./glyphs";
import { GLYPHS } from "./glyphs";
import styles from "./Icon.module.scss";

type IconProps = {
  name: IconName;
  label?: string;
  className?: string;
};

export const Icon = ({ name, label, className }: IconProps) => {
  const glyph = GLYPHS[name];
  return (
    <svg
      viewBox={glyph.viewBox}
      className={cx(styles.icon, styles[glyph.mode], className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {glyph.paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
};
