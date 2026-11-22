export type Faq = { id: string; question: string; answer: string };

export const FAQS: readonly Faq[] = [
  { id: "que-ofrece", question: "¿Qué ofrece Babaluum?", answer: "Programas de inteligencia artificial, creación de contenido, conciencia ambiental y desarrollo profesional, además de voluntariados y nuestro podcast ¿Cómo lo hacen?." },
  { id: "como-medimos", question: "¿Cómo miden el impacto?", answer: "Cada proyecto define metas al inicio: alcance, participación y cambio en la comunidad. Las medimos juntos al cerrar cada ciclo." },
  { id: "como-empiezo", question: "¿Cómo empiezo en Babaluum?", answer: "Únete gratis a la comunidad, elige un programa y agenda tu primera sesión de bienvenida." },
  { id: "acompanamiento", question: "¿Tienen acompañamiento continuo?", answer: "Sí. Tienes mentorías, sesiones abiertas y una comunidad activa para seguir creciendo después del programa." },
];
