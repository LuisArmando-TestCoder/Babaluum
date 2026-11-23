"use client";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
import type { FormEvent } from "react";
import { useId, useState } from "react";
import { PillField } from "@/components/primitives/PillField";
import { SIGNUP } from "@/content/newsletter";
import type { Interest } from "@/domain/newsletter/subscription";
import { validateSubscription } from "@/domain/newsletter/subscription";
import { useSound } from "@/providers/Sound";
import { DoneStep, EmailStep, NameStep } from "./SignupSteps";
import styles from "./SignupFlow.module.scss";

type Step = "email" | "name" | "done";

type Outcome = "subscribed" | "simulated" | "offline" | "failed";

type Fields = Record<string, FormDataEntryValue>;

const STEPS: readonly Step[] = ["email", "name", "done"];

const OUTCOMES: Record<number, Outcome> = { 200: "subscribed", 202: "simulated", 501: "offline" };

const SHAKE = [0, -10, 9, -6, 4, 0];

const send = async (payload: object): Promise<Outcome> => {
  const response = await fetch("/api/newsletter", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => null);
  return OUTCOMES[response?.status ?? 0] ?? "failed";
};

type SignupFlowProps = { interest: Interest; action: string };

export const SignupFlow = ({ interest, action }: SignupFlowProps) => {
  const [step, setStep] = useState<Step>("email");
  const [member, setMember] = useState({ email: "", name: "", trial: false });
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const [stage, animate] = useAnimate<HTMLDivElement>();
  const { play } = useSound();
  const problemId = useId();

  const refuse = (text: string) => {
    setProblem(text);
    play("error");
    void animate(stage.current, { x: SHAKE }, { duration: 0.45 });
  };

  const joinWith = async (fields: Fields) => {
    const result = validateSubscription({ ...fields, interest });
    if (!result.ok) return refuse(result.error);
    setProblem(null);
    setBusy(true);
    const outcome = await send({ ...fields, ...result.subscription });
    setBusy(false);
    if (outcome === "offline" || outcome === "failed") return refuse(SIGNUP[outcome]);
    setMember({ email: result.subscription.email, name: "", trial: outcome === "simulated" });
    setStep("name");
    play("step");
  };

  const finishAs = async (name: string) => {
    if (name) {
      setBusy(true);
      await send({ email: member.email, interest, name });
      setBusy(false);
    }
    setMember((current) => ({ ...current, name }));
    setStep("done");
    play("success");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields: Fields = Object.fromEntries(new FormData(event.currentTarget));
    void (step === "email" ? joinWith(fields) : finishAs(String(fields.name ?? "").trim()));
  };

  const position = STEPS.indexOf(step);

  return (
    <form className={styles.flow} onSubmit={submit} onInput={() => setProblem(null)} noValidate>
      <div className={styles.progress} role="progressbar" aria-label="Paso" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={position + 1}>
        {STEPS.map((name, index) => (
          <span key={name} className={styles.tick} data-reached={index <= position} data-current={index === position} />
        ))}
      </div>
      <div ref={stage} className={styles.stage}>
        <AnimatePresence mode="wait" initial={false}>
          {step === "email" && (
            <EmailStep key="email">
              <PillField name="email" type="email" label={SIGNUP.emailLabel} action={action} autoComplete="email" busy={busy} invalid={Boolean(problem)} describedBy={problemId} />
            </EmailStep>
          )}
          {step === "name" && (
            <NameStep key="name" onSkip={() => void finishAs("")}>
              <PillField name="name" label={SIGNUP.nameLabel} action={SIGNUP.nameAction} autoComplete="given-name" autoFocus busy={busy} />
            </NameStep>
          )}
          {step === "done" && <DoneStep key="done" name={member.name} trial={member.trial} />}
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false}>
        {problem && (
          <motion.p
            key={problem}
            id={problemId}
            className={styles.problem}
            role="alert"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {problem}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
};
