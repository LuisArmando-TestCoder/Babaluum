import type { Interest } from "@/domain/newsletter/subscription";
import { SITE } from "./site";

export type NewsletterCopy = { title: string; aside: string; action: string; interest: Interest };

export const NEWSLETTER: NewsletterCopy = {
  title: "Lo nuevo de Babaluum, en tu correo",
  aside: "Contenido, convocatorias y eventos antes que en redes. Sin spam: te das de baja cuando quieras.",
  action: "Suscribirme",
  interest: "general",
};

export const SIGNUP = {
  emailLabel: "Tu correo",
  namePrompt: "Anotado. ¿Cómo te llamamos?",
  nameLabel: "Tu nombre",
  nameAction: "Guardar nombre",
  skip: "Omitir",
  done: "Ya estás en la lista.",
  trial: "Modo de prueba: el boletín no está conectado y tu correo no se guardó.",
  offline: `El boletín todavía no está conectado. Mientras tanto, escríbenos a ${SITE.email}.`,
  failed: `No pudimos anotarte. Inténtalo de nuevo o escríbenos a ${SITE.email}.`,
} as const;
