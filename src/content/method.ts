export type MethodStep = { id: string; title: string; body: string };

export const METHOD_STEPS: readonly MethodStep[] = [
  { id: "01", title: "Conocemos tu motivación", body: "Empezamos escuchando: qué te mueve, qué quieres aprender y qué impacto sueñas con crear." },
  { id: "02", title: "Diseñamos tu ruta y creamos juntos", body: "Con base en tus metas armamos una ruta clara de programas, mentorías y entregables, y nos ponemos manos a la obra." },
  { id: "03", title: "Colaboramos y mejoramos", body: "Trabajas en equipo con la comunidad, recibes retroalimentación y ajustas cada pieza hasta que funcione." },
  { id: "04", title: "Compartimos y medimos el impacto", body: "Publicamos lo que creaste, medimos su alcance y celebramos el cambio real que generó." },
];

export const METHOD_SHOWCASE = {
  palette: { title: "Paleta de color", note: "En Babaluum creemos que los colores hablan más fuerte que las palabras.", swatches: ["purple", "sky", "lime", "green"] },
  typography: { title: "Tipografía", note: "Tipografía que amplifica", primary: "Anton", secondary: "DM Sans" },
  posts: { title: "Publicaciones", note: "Diseños que impulsan comunidades" },
} as const;
