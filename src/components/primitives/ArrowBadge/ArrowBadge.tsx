import type { IconName } from "../Icon";
import { Icon } from "../Icon";
import { cx } from "@/domain/design/cx";
import styles from "./ArrowBadge.module.scss";

type ArrowBadgeProps = {
  icon?: IconName;
  size?: "s" | "m";
  className?: string;
};

export const ArrowBadge = ({ icon = "arrow-up-right", size = "m", className }: ArrowBadgeProps) => (
  <span className={cx(styles.badge, styles[size], className)} aria-hidden="true">
    <Icon name={icon} />
  </span>
);
