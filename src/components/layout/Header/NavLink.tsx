import Link from "next/link";
import type { NavLink as NavLinkData } from "@/content/site";
import styles from "./NavLink.module.scss";

type NavLinkProps = { link: NavLinkData; pathname: string };

export const isCurrent = (pathname: string, href: string): boolean => pathname === href || pathname.startsWith(`${href}/`);

export const NavLink = ({ link, pathname }: NavLinkProps) => (
  <Link href={link.href} className={styles.link} aria-current={isCurrent(pathname, link.href) ? "page" : undefined}>
    <span className={styles.roll} data-label={link.label}>
      {link.label}
    </span>
  </Link>
);
