"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Field } from "@/components/primitives/Field";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { SITE } from "@/content/site";
import styles from "./ContactForm.module.scss";

const toMailto = (form: FormData): string => {
  const subject = encodeURIComponent(String(form.get("subject") ?? "Hola Babaluum"));
  const body = encodeURIComponent(`${form.get("message") ?? ""}\n\n${form.get("name") ?? ""} · ${form.get("phone") ?? ""}`);
  return `mailto:${SITE.email}?subject=${subject}&body=${body}`;
};

export const ContactForm = () => {
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = toMailto(new FormData(event.currentTarget));
    setSent(true);
  };

  return (
    <Section spacing="m">
      <SectionHeader eyebrow="Contacto" accent="red" title="Envíanos un mensaje" aside="Cuéntanos qué te gustaría crear y te respondemos en menos de 48 horas." />
      <form className={styles.form} onSubmit={submit}>
        <Field name="name" label="Nombre completo" required />
        <Field name="email" type="email" label="Correo electrónico" required />
        <Field name="phone" type="tel" label="Teléfono" />
        <Field name="subject" label="Asunto" />
        <Field name="message" label="Escribe tu mensaje" multiline required className={styles.wide} />
        <div className={styles.actions}>
          <Button type="submit" variant="dark">
            Enviar mensaje
          </Button>
          <AnimatePresence>
            {sent && (
              <motion.p className={styles.sent} role="status" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
                ¡Gracias! Abrimos tu correo para enviarlo.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </Section>
  );
};
