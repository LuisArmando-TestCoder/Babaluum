"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Icon } from "@/components/primitives/Icon";
import { NOTCHES, NotchedSurface } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import type { MethodStep } from "@/content/method";
import { METHOD_STEPS } from "@/content/method";
import { MethodShowcase } from "./MethodShowcase";
import styles from "./MethodAccordion.module.scss";

const OPEN = { height: "auto", opacity: 1 };
const CLOSED = { height: 0, opacity: 0 };

type StepRowProps = { step: MethodStep; index: number; open: boolean; onToggle: () => void };

const StepRow = ({ step, index, open, onToggle }: StepRowProps) => (
  <button type="button" className={styles.row} aria-expanded={open} onClick={onToggle}>
    <span className={styles.number}>{index + 1}.</span>
    <span className={styles.title}>{step.title}</span>
    <span className={styles.body}>{step.body}</span>
    <span className={styles.toggle} data-open={open}>
      <Icon name="chevron-down" />
    </span>
  </button>
);

type MethodAccordionProps = { eyebrow?: string; title?: string };

export const MethodAccordion = ({ eyebrow = "Cómo trabajamos", title = "Nuestro método" }: MethodAccordionProps) => {
  const [openId, setOpenId] = useState(METHOD_STEPS[1]?.id);

  return (
    <Section>
      <SectionHeader eyebrow={eyebrow} accent="red" title={title} />
      <ol className={styles.list}>
        {METHOD_STEPS.map((step, index) => {
          const open = step.id === openId;
          return (
            <li key={step.id} className={styles.item}>
              <NotchedSurface tone={open ? "lime" : undefined} notches={open ? NOTCHES.side : []} className={styles.surface}>
                <StepRow step={step} index={index} open={open} onToggle={() => setOpenId(open ? undefined : step.id)} />
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div className={styles.panel} initial={CLOSED} animate={OPEN} exit={CLOSED} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                      <MethodShowcase />
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
