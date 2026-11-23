import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { IconName } from "@/components/primitives/Icon";
import { Icon } from "@/components/primitives/Icon";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SITE } from "@/content/site";
import styles from "./ContactCards.module.scss";

type Channel = { title: string; lines: ReadonlyArray<{ text: string; href?: string }>; icon: IconName; shape: NotchPreset };

const CHANNELS: readonly Channel[] = [
  { title: "Escríbenos", lines: [{ text: SITE.email, href: `mailto:${SITE.email}` }, { text: "Dudas, ideas y colaboraciones" }], icon: "sms", shape: "stat" },
  { title: "Dónde estamos", lines: [{ text: SITE.address }, { text: "Eventos presenciales y en línea" }], icon: "picture-frame", shape: "ticket" },
  { title: "Síguenos", lines: [{ text: "@babaluumcr", href: "https://www.instagram.com/babaluumcr/" }, { text: "También en Facebook y LinkedIn" }], icon: "instagram", shape: "tab" },
];

export const ContactCards = () => (
  <Section spacing="l">
    <RevealGroup as="ul" className={styles.grid}>
      {CHANNELS.map((channel, index) => (
        <RevealItem as="li" key={channel.title} index={index}>
          <NotchedSurface tone="mist" notches={NOTCHES[channel.shape]} className={styles.card}>
            <Icon name={channel.icon} className={styles.icon} />
            <h2 className={styles.title}>{channel.title}</h2>
            {channel.lines.map((line) => (
              <p key={line.text} className={styles.line}>
                {line.href ? <a href={line.href}>{line.text}</a> : line.text}
              </p>
            ))}
          </NotchedSurface>
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
