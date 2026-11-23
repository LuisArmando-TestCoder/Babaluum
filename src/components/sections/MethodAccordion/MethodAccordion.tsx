"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@/components/primitives/Icon";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import type { MethodCopy, MethodStep } from "@/content/method";
import { METHOD } from "@/content/method";
import { rateForStep } from "@/domain/sound/control";
import { MethodShowcase } from "./MethodShowcase";
import styles from "./MethodAccordion.module.scss";

const OPEN = { height: "auto", opacity: 1 };
const CLOSED = { height: 0, opacity: 0 };
const TRANSITION = { duration: 0.75, ease: [0.19, 1, 0.22, 1] } as const;

type StepRowProps = { step: MethodStep; index: number; open: boolean; onToggle: () => void };

const StepRow = ({ step, index, open, onToggle }: StepRowProps) => (
  <button type="button" className={styles.row} aria-expanded={open} aria-controls={`paso-${step.id}`} onClick={onToggle} data-cursor={open ? "Cerrar" : "Abrir"} data-sound-rate={rateForStep(index)}>
    <span className={styles.number}>{index + 1}.</span>
    <span className={styles.title}>{step.title}</span>
    <span className={styles.body}>{step.body}</span>
    <span className={styles.toggle} data-open={open}>
      <Icon name="chevron-down" />
    </span>
  </button>
);

type MethodAccordionProps = { copy?: MethodCopy };

export const MethodAccordion = ({ copy = METHOD }: MethodAccordionProps) => {
  const [openId, setOpenId] = useState(copy.steps[1]?.id);

  return (
    <Section>
      <SectionHeader eyebrow={copy.eyebrow} accent="red" title={copy.title} className={styles.header} />
      <ol className={styles.list}>
        {copy.steps.map((step, index) => {
          const open = step.id === openId;
          return (
            <li key={step.id} className={styles.item} data-open={open}>
              <NotchedSurface tone={open ? step.tone : undefined} notches={open ? NOTCHES.panel : []} className={styles.surface}>
                <StepRow step={step} index={index} open={open} onToggle={() => setOpenId(open ? undefined : step.id)} />
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div id={`paso-${step.id}`} className={styles.panel} initial={CLOSED} animate={OPEN} exit={CLOSED} transition={TRANSITION}>
                      <MethodShowcase showcase={step.showcase} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </NotchedSurface>
            </li>
          );
        })}
      </ol>
    </Section>
  );
};
