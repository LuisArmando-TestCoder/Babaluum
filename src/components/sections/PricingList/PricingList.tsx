import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/primitives/Button";
import { Heading, Highlight } from "@/components/primitives/Heading";
import { Icon } from "@/components/primitives/Icon";
import type { NotchPreset } from "@/components/primitives/NotchedSurface";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Pill } from "@/components/primitives/Pill";
import { Section } from "@/components/primitives/Section";
import { PLANS } from "@/content/plans";
import styles from "./PricingList.module.scss";

const SHAPES: readonly NotchPreset[] = ["side", "ticket", "tab"];

export const PricingList = () => (
  <Section>
    <Heading size="h2" align="center" className={styles.title}>
      Planes accesibles para <Highlight>crecer en comunidad</Highlight>
    </Heading>
    <RevealGroup as="ul" className={styles.list}>
      {PLANS.map((plan, index) => (
        <RevealItem as="li" key={plan.id}>
          <NotchedSurface as="article" tone={plan.tone} notches={NOTCHES[SHAPES[index % SHAPES.length] ?? "tab"]} className={styles.plan}>
            <div className={styles.intro}>
              {plan.badge && (
                <Pill tone="orange" tilt={-6} className={styles.badge}>
                  {plan.badge}
                </Pill>
              )}
              <h3 className={styles.name}>{plan.name}</h3>
              <p className={styles.summary}>{plan.summary}</p>
            </div>
            <ul className={styles.features}>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Icon name="tick-circle" className={styles.tick} />
                  {feature}
                </li>
              ))}
            </ul>
            <div className={styles.price}>
              <p className={styles.amount}>
                {plan.price}
                <small>{plan.period}</small>
              </p>
              <Button href="/contacto" variant={plan.tone === "lime" ? "dark" : "light"}>
                Elegir plan
              </Button>
            </div>
          </NotchedSurface>
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
