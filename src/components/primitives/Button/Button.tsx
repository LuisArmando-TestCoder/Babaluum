import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/domain/design/cx";
import { Icon } from "../Icon";
import styles from "./Button.module.scss";

export type ButtonVariant = "light" | "dark" | "accent";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: "m" | "l";
  withArrow?: boolean;
  silent?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonLinkProps = ButtonBaseProps & { href: string; type?: never; onClick?: never; disabled?: never };

type ButtonActionProps = ButtonBaseProps & { href?: never; type?: "button" | "submit"; onClick?: () => void; disabled?: boolean };

const SILENT = { "data-sound": "none" } as const;

const FEEDBACK = { m: {}, l: { "data-burst": "" } } as const;

const Arrow = () => (
  <span className={styles.arrow} aria-hidden="true">
    <Icon name="arrow-right" className={styles.arrowOut} />
    <Icon name="arrow-right" className={styles.arrowIn} />
  </span>
);

export const Button = ({ variant = "light", size = "m", withArrow = true, silent = false, className, children, ...action }: ButtonLinkProps | ButtonActionProps) => {
  const classes = cx(styles.button, styles[variant], styles[size], className);
  const feedback = silent ? SILENT : FEEDBACK[size];
  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {withArrow && <Arrow />}
    </>
  );
  if (action.href !== undefined) {
    return (
      <Link href={action.href} className={classes} data-cursor="hide" {...feedback}>
        {content}
      </Link>
    );
  }
  return (
    <button type={action.type ?? "button"} onClick={action.onClick} disabled={action.disabled} className={classes} data-cursor="hide" {...feedback}>
      {content}
    </button>
  );
};
