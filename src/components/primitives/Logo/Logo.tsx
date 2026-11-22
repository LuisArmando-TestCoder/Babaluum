import Link from "next/link";
import { cx } from "@/domain/design/cx";
import styles from "./Logo.module.scss";

type LogoProps = {
  size?: "s" | "l";
  className?: string;
};

export const Logo = ({ size = "s", className }: LogoProps) => (
  <Link href="/" className={cx(styles.logo, styles[size], className)} aria-label="Babaluum, inicio">
    <svg viewBox="0 0 64 64" className={styles.mark} aria-hidden="true">
      <circle cx={32} cy={32} r={32} className={styles.disc} />
      <path
        className={styles.glyph}
        d="M25 17h9.5c5.5 0 9 2.8 9 7.2 0 3-1.7 5.1-4.4 6 3.5.8 5.6 3.4 5.6 6.9 0 4.9-3.8 7.9-9.8 7.9H25M25 30.6h9.6M25 17v28M21 30.6h4"
      />
    </svg>
    <span className={styles.word}>abaluum</span>
  </Link>
);
