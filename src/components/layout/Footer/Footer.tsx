import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Icon } from "@/components/primitives/Icon";
import { Logo } from "@/components/primitives/Logo";
import { EXPLORE_NAV, FOOTER_NAV, LEGAL_NAV, SITE, SOCIALS } from "@/content/site";
import styles from "./Footer.module.scss";

export const Footer = () => (
  <footer className={styles.footer}>
    <Container className={styles.grid}>
      <div className={styles.brand}>
        <Logo size="l" className={styles.logo} />
        <p className={styles.blurb}>{SITE.description}</p>
        <ul className={styles.socials}>
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a href={social.href} className={styles.social} target="_blank" rel="noreferrer">
                <Icon name={social.icon} label={social.label} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.side}>
        <nav aria-label="Pie de página">
          <ul className={styles.links}>
            {FOOTER_NAV.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  <span className={styles.chevron}>
                    <Icon name="chevron-right" />
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Explora" className={styles.explore}>
          {EXPLORE_NAV.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <p className={styles.legal}>
          {SITE.copyright}
          <span className={styles.legalLinks}>
            {LEGAL_NAV.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </span>
        </p>
      </div>
    </Container>
  </footer>
);
