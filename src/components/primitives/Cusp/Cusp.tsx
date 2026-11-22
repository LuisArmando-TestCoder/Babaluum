import { cx } from "@/domain/design/cx";
import styles from "./Cusp.module.scss";

type CuspProps = { className?: string };

export const Cusp = ({ className }: CuspProps) => (
  <svg viewBox="0 0 180 60" preserveAspectRatio="xMidYMax meet" className={cx(styles.cusp, className)} aria-hidden="true">
    <path d="M30 60 A60 60 0 0 0 90 0 A60 60 0 0 0 150 60 Z" />
  </svg>
);
