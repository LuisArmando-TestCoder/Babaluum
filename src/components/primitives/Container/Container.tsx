import type { ReactNode } from "react";
import { cx } from "@/domain/design/cx";
import styles from "./Container.module.scss";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

export const Container = ({ className, children }: ContainerProps) => (
  <div className={cx(styles.container, className)}>{children}</div>
);
