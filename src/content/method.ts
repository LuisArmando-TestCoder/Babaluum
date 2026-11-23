import type { Accent, Tone } from "@/domain/design/tone";

export type PhaseCard = { title: string; duration: string; tags: readonly string[] };

export type Sprint = { title: string; hours: string; heading: string; body: string };

export type BrandBoard = {
  palette: { source: string; page: string; title: string; note: string };
  typography: { title: string; note: string; primaryLabel: string; secondaryLabel: string };
  posts: { title: string; note: string; handle: string };
};

export type SprintBoard = { first: Sprint; notes: { title: string; note: string }; second: Sprint };

export type ResultsBoard = {
  chart: { title: string; body: string; caption: string };
  campaign: { title: string; note: string; metricLabel: string; metric: string };
};

export type Showcase =
  | { kind: "phases"; cards: readonly PhaseCard[] }
  | ({ kind: "brand" } & BrandBoard)
  | ({ kind: "sprints" } & SprintBoard)
  | ({ kind: "results" } & ResultsBoard);

export type MethodStep = { id: string; title: string; body: string; tone: Tone; showcase: Showcase };

export type MethodCopy = { eyebrow: string; title: string; steps: readonly MethodStep[] };

type StepText = Pick<MethodStep, "title" | "body">;

export type MethodText = {
  eyebrow: string;
  title: string;
  steps: readonly [StepText, StepText, StepText, StepText];
  phases: readonly PhaseCard[];
  brand: BrandBoard;
  sprints: SprintBoard;
  results: ResultsBoard;
};

export const SHOWCASE_SWATCHES: readonly Accent[] = ["purple", "sky", "lime", "green"];

export const SHOWCASE_FONTS = { primary: "Anton", secondary: "DM Sans" } as const;

export const buildMethod = ({ eyebrow, title, steps, phases, brand, sprints, results }: MethodText): MethodCopy => ({
  eyebrow,
  title,
  steps: [
    { id: "01", ...steps[0], tone: "orange", showcase: { kind: "phases", cards: phases } },
    { id: "02", ...steps[1], tone: "lime", showcase: { kind: "brand", ...brand } },
    { id: "03", ...steps[2], tone: "red", showcase: { kind: "sprints", ...sprints } },
    { id: "04", ...steps[3], tone: "green", showcase: { kind: "results", ...results } },
  ],
});

export const METHOD: MethodCopy = buildMethod({
  eyebrow: "Cómo trabajamos",
  title: "Nuestro método",
  steps: [
    { title: "Conocemos tu motivación", body: "Empezamos escuchando: qué te mueve, qué quieres aprender y qué impacto sueñas con crear." },
    { title: "Diseñamos tu ruta y creamos juntos", body: "Con base en tus metas armamos una ruta clara de programas, mentorías y entregables, y nos ponemos manos a la obra." },
    { title: "Colaboramos y mejoramos", body: "Trabajas en equipo con la comunidad, recibes retroalimentación y ajustas cada pieza hasta que funcione." },
    { title: "Compartimos y medimos el impacto", body: "Publicamos lo que creaste, medimos su alcance y celebramos el cambio real que generó." },
  ],
  phases: [
    { title: "Estrategia", duration: "Duración: 3 semanas", tags: ["Funcionalidad", "Metas", "Ideación", "Investigación"] },
    { title: "Descubrimiento", duration: "Duración: 3 semanas", tags: ["Entrevistas", "Público", "Flujo", "Preliminar"] },
    { title: "Solución", duration: "Duración: 4 semanas", tags: ["Materiales", "Redacción", "Público", "Contenidos"] },
  ],
  brand: {
    palette: { source: "Material de la comunidad", page: "Página 05", title: "Paleta de color", note: "En Babaluum creemos que los colores hablan más fuerte que las palabras." },
    typography: { title: "Tipografía", note: "Tipografía que amplifica", primaryLabel: "Primaria", secondaryLabel: "Secundaria" },
    posts: { title: "Publicaciones", note: "Diseños que impulsan comunidades", handle: "Babaluum" },
  },
  sprints: {
    first: { title: "1-3 sprints", hours: "2.30 h", heading: "Descubrimiento y estrategia con investigación", body: "Identificamos a quién le hablas y qué valor ofreces, y armamos un plan de contenido completo." },
    notes: { title: "Sesión de notas", note: "Notas de investigación" },
    second: { title: "3-5 sprints", hours: "2.30 h", heading: "Descubrimiento y estrategia", body: "Identificamos a quién le hablas y qué valor ofreces, y armamos un plan de contenido completo." },
  },
  results: {
    chart: { title: "Exploración y definición del reto", body: "Entendemos el contexto e identificamos los retos clave.", caption: "Fase de investigación 1" },
    campaign: { title: "Resultados de campaña", note: "Reportes y tendencias del trimestre", metricLabel: "Aumento de alcance", metric: "85%" },
  },
});
