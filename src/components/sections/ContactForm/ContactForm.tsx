"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { Suspense, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Field } from "@/components/primitives/Field";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { subjectFor } from "@/content/contact";
import { SITE } from "@/content/site";
import type { ContactErrors } from "@/domain/contact/message";
import { toMailto, validateContact } from "@/domain/contact/message";
import { useSound } from "@/providers/Sound";
import styles from "./ContactForm.module.scss";

type Status = "idle" | "sending" | "sent" | "handoff" | "failed";

const FEEDBACK: Record<Status, string> = {
  idle: "",
  sending: "Enviando tu mensaje…",
  sent: "Mensaje enviado. Te respondemos en menos de 48 horas.",
  handoff: "Abrimos tu aplicación de correo con el mensaje listo. Presiona enviar ahí.",
  failed: `No pudimos enviar el mensaje. Inténtalo de nuevo o escribe a ${SITE.email}.`,
};

const deliver = async (payload: object): Promise<Status> => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => null);
  if (response?.ok) return "sent";
  return response?.status === 501 ? "handoff" : "failed";
};

const Form = ({ subject }: { subject: string }) => {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const { play } = useSound();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    const result = validateContact(fields);
    setErrors(result.ok ? {} : result.errors);
    if (!result.ok) return play("error");
    setStatus("sending");
    const outcome = await deliver(fields);
    setStatus(outcome);
    play(outcome === "failed" ? "error" : "success");
    if (outcome === "handoff") window.location.href = toMailto(SITE.email, result.message);
    if (outcome === "sent") form.reset();
  };

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <Field name="name" label="Nombre completo" autoComplete="name" required error={errors.name} />
      <Field name="email" type="email" label="Correo electrónico" autoComplete="email" required error={errors.email} />
      <Field name="phone" type="tel" label="Teléfono" autoComplete="tel" error={errors.phone} />
      <Field name="subject" label="Asunto" defaultValue={subject} />
      <Field name="message" label="Escribe tu mensaje" multiline required error={errors.message} className={styles.wide} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.trap} />
      <div className={styles.actions}>
        <Button type="submit" variant="dark" size="l" disabled={status === "sending"} className={styles.send} silent>
          Enviar mensaje
        </Button>
        <AnimatePresence mode="wait">
          {status !== "idle" && (
            <motion.p key={status} className={styles.feedback} data-status={status} role="status" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              {FEEDBACK[status]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

const PrefilledForm = () => {
  const params = useSearchParams();
  return <Form subject={subjectFor({ plan: params.get("plan"), programa: params.get("programa") })} />;
};

export const ContactForm = () => (
  <Section spacing="m" id="mensaje">
    <SectionHeader eyebrow="Contacto" accent="purple" title="Envíanos un mensaje" aside="Cuéntanos qué te gustaría crear y te respondemos en menos de 48 horas." />
    <Suspense fallback={<Form subject="" />}>
      <PrefilledForm />
    </Suspense>
  </Section>
);
