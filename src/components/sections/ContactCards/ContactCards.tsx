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
  { title: "Escríbenos", lines: [{ text: SITE.email, href: `mailto:${SITE.email}` }, { text: "Respondemos en 48 horas" }], icon: "sms", shape: "stat" },
  { title: "Visítanos", lines: [{ text: SITE.address }, { text: "Lunes a viernes, 9:00 a 17:00" }], icon: "picture-frame", shape: "ticket" },
  { title: "Llámanos", lines: [{ text: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` }, { text: "También por WhatsApp" }], icon: "call", shape: "tab" },
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
