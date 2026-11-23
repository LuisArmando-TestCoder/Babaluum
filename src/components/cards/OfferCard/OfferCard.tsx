import type { ReactNode } from "react";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/primitives/Icon";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Pill } from "@/components/primitives/Pill";
import type { Tone } from "@/domain/design/tone";
import styles from "./OfferCard.module.scss";

type OfferCardProps = {
  id?: string;
  tone: Tone;
  shape?: NotchPreset;
  title: string;
  summary: string;
  badge?: string;
  listTitle: string;
  items: readonly string[];
  headline: ReactNode;
  cta: { label: string; href: string };
};

export const OfferCard = ({ id, tone, shape = "offer", title, summary, badge, listTitle, items, headline, cta }: OfferCardProps) => (
  <div id={id} className={styles.anchor}>
    <NotchedSurface as="article" tone={tone} notches={NOTCHES[shape]} className={styles.card}>
      <div className={styles.intro}>
        {badge && (
          <Pill tone="orange" tilt={-8} size="m" className={styles.badge}>
            {badge}
          </Pill>
        )}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>
      </div>
      <div>
        <p className={styles.listTitle}>{listTitle}</p>
        <ul className={styles.items}>
          {items.map((item) => (
            <li key={item}>
              <Icon name="plus" className={styles.bullet} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.action}>
        <p className={styles.headline}>{headline}</p>
        <Button href={cta.href} size="l" variant={tone === "lime" ? "dark" : "light"}>
          {cta.label}
        </Button>
      </div>
    </NotchedSurface>
  </div>
);
