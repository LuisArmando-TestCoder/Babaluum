import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/domain/design/cx";
import { Icon } from "../Icon";
import styles from "./Button.module.scss";

export type ButtonVariant = "light" | "dark" | "accent";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonLinkProps = ButtonBaseProps & { href: string; type?: never; onClick?: never };

type ButtonActionProps = ButtonBaseProps & { href?: never; type?: "button" | "submit"; onClick?: () => void };

export const Button = ({ variant = "light", withArrow = true, className, children, ...action }: ButtonLinkProps | ButtonActionProps) => {
  const classes = cx(styles.button, styles[variant], className);
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {withArrow && <Icon name="arrow-right" className={styles.arrow} />}
    </>
  );
  if (action.href !== undefined) {
    return (
      <Link href={action.href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type={action.type ?? "button"} onClick={action.onClick} className={classes}>
      {content}
    </button>
  );
};
