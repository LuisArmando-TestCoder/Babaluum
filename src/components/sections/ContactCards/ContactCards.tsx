import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { IconName } from "@/components/primitives/Icon";
import { Icon } from "@/components/primitives/Icon";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SITE } from "@/content/site";
import styles from "./ContactCards.module.scss";

const CHANNELS: ReadonlyArray<{ title: string; lines: readonly string[]; icon: IconName; shape: NotchPreset }> = [
  { title: "Escríbenos", lines: [SITE.email, "comunidad@babaluum.com"], icon: "sms", shape: "tab" },
  { title: "Visítanos", lines: [SITE.address, "Lunes a viernes, 9:00 a 17:00"], icon: "picture-frame", shape: "ticket" },
  { title: "Llámanos", lines: [SITE.phone, "WhatsApp disponible"], icon: "call", shape: "stat" },
];

export const ContactCards = () => (
  <Section spacing="m">
    <RevealGroup as="ul" className={styles.grid}>
      {CHANNELS.map((channel) => (
        <RevealItem as="li" key={channel.title}>
          <NotchedSurface tone="sky" notches={NOTCHES[channel.shape]} className={styles.card}>
            <Icon name={channel.icon} className={styles.icon} />
            <h2 className={styles.title}>{channel.title}</h2>
            {channel.lines.map((line) => (
              <p key={line} className={styles.line}>
                {line}
              </p>
            ))}
          </NotchedSurface>
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
