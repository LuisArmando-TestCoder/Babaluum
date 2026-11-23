"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SIGNUP } from "@/content/newsletter";
import styles from "./SignupSteps.module.scss";

const SLIDE = {
  initial: { opacity: 0, x: 36, filter: "blur(6px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -36, filter: "blur(6px)" },
  transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
} as const;

const DRAW = { delay: 0.35, duration: 0.5, ease: [0.19, 1, 0.22, 1] } as const;

export const EmailStep = ({ children }: { children: ReactNode }) => (
  <motion.div className={styles.step} {...SLIDE}>
    {children}
    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.trap} />
  </motion.div>
);

type NameStepProps = { onSkip: () => void; children: ReactNode };

export const NameStep = ({ onSkip, children }: NameStepProps) => (
  <motion.div className={styles.step} {...SLIDE}>
    <p className={styles.prompt}>{SIGNUP.namePrompt}</p>
    {children}
    <button type="button" className={styles.skip} onClick={onSkip} data-burst="">
      {SIGNUP.skip}
    </button>
  </motion.div>
);

type DoneStepProps = { name: string; trial: boolean };

export const DoneStep = ({ name, trial }: DoneStepProps) => (
  <motion.div className={styles.step} role="status" {...SLIDE}>
    <p className={styles.done}>
      <span className={styles.badge}>
        <svg viewBox="0 0 24 24" className={styles.check} aria-hidden="true">
          <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={DRAW} />
        </svg>
      </span>
      <span>
        {name ? `Listo, ${name}.` : "Listo."} {SIGNUP.done}
      </span>
    </p>
    {trial && <p className={styles.trial}>{SIGNUP.trial}</p>}
  </motion.div>
);
