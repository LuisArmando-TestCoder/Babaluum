import Link from "next/link";
import { cx } from "@/domain/design/cx";
import styles from "./Logo.module.scss";

type LogoProps = {
  size?: "s" | "l";
  className?: string;
};

export const Logo = ({ size = "s", className }: LogoProps) => (
  <Link href="/" className={cx(styles.logo, styles[size], className)} aria-label="Babaluum, inicio">
    <span className={styles.mark} />
    <span className={styles.word} />
  </Link>
);
