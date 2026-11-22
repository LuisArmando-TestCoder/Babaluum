import type { CSSProperties, ElementType, ReactNode } from "react";
import { cx } from "@/domain/design/cx";
import type { Tone } from "@/domain/design/tone";
import type { Notch } from "./notchMask";
import { notchMask } from "./notchMask";
import styles from "./NotchedSurface.module.scss";

type SurfaceElement = "div" | "article" | "section" | "figure" | "li" | "aside";

type NotchedSurfaceProps = {
  as?: SurfaceElement;
  tone?: Tone;
  notches?: readonly Notch[];
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export const NotchedSurface = ({ as = "div", tone, notches = [], className, style, children }: NotchedSurfaceProps) => {
  const Element: ElementType = as;
  return (
    <Element
      data-tone={tone}
      className={cx(styles.surface, className)}
      style={{ ...notchMask(notches), ...style }}
    >
      {children}
    </Element>
  );
};
