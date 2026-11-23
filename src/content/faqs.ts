export type Faq = { id: string; question: string; answer: string };

export const FAQS: readonly Faq[] = [
  {
    id: "que-es",
    question: "¿Qué es Babaluum?",
    answer:
      "Un hub de aprendizaje y contenido sobre inteligencia artificial, conciencia ambiental y desarrollo profesional. Publicamos artículos, producimos el podcast ¿Cómo lo hacen?, organizamos eventos y abrimos programas para escritores, pasantes y voluntarios.",
  },
  { id: "costo", question: "¿Tiene algún costo?", answer: "Suscribirte al newsletter y leer nuestro contenido es gratis." },
  {
    id: "programas",
    question: "¿Cómo participo en un programa?",
    answer: "El Programa de escritores abre inscripciones en 2027: deja tu correo y te avisamos. Para pasantías y voluntariados, cuéntanos tu interés desde la página del programa.",
  },
  { id: "aliados", question: "¿Cómo puede colaborar mi organización?", answer: "Escríbenos a hola@babaluum.com. Trabajamos colaboraciones en eventos y alianzas con impacto social." },
];
