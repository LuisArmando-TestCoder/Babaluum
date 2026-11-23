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
    { title: "Escuchamos a la comunidad", body: "Partimos de las preguntas de estudiantes y profesionales: qué quieren aprender sobre tecnología, sostenibilidad y carrera." },
    { title: "Creamos contenido con propósito", body: "Convertimos esas preguntas en blogs, episodios del podcast, entrevistas y eventos, con información clara y útil." },
    { title: "Sumamos voces y manos", body: "Escritores, pasantes, voluntarios y aliados se integran para llevar cada iniciativa más lejos." },
    { title: "Compartimos y medimos el impacto", body: "Publicamos, escuchamos la respuesta de la comunidad y usamos lo aprendido para mejorar lo siguiente." },
  ],
  phases: [
    { title: "Escucha", duration: "Paso 1", tags: ["Preguntas", "Encuestas", "Comentarios", "Tendencias"] },
    { title: "Enfoque", duration: "Paso 2", tags: ["Tecnología", "Sostenibilidad", "Carrera", "Comunidad"] },
    { title: "Plan", duration: "Paso 3", tags: ["Temas", "Formatos", "Invitados", "Fechas"] },
  ],
  brand: {
    palette: { source: "Guía de marca Babaluum", page: "Página 05", title: "Paleta de color", note: "En Babaluum creemos que los colores hablan más fuerte que las palabras." },
    typography: { title: "Tipografía", note: "Tipografía que amplifica", primaryLabel: "Primaria", secondaryLabel: "Secundaria" },
    posts: { title: "Publicaciones", note: "Piezas pensadas para compartir", handle: "Babaluum" },
  },
  sprints: {
    first: { title: "Escritores", hours: "Edición en equipo", heading: "Cada artículo pasa por una persona editora", body: "Quien escribe recibe retroalimentación antes de publicar con su firma." },
    notes: { title: "Lluvia de ideas", note: "Notas de la comunidad" },
    second: { title: "Voluntarios", hours: "Eventos y proyectos", heading: "Manos para que las iniciativas sucedan", body: "Pasantes y voluntarios apoyan eventos, contenido y proyectos con impacto social." },
  },
  results: {
    chart: { title: "Lo que aprendemos de cada publicación", body: "Vemos qué temas ayudan más y ajustamos el siguiente contenido.", caption: "Ejemplo ilustrativo" },
    campaign: { title: "Reporte de ejemplo", note: "Así cerramos cada iniciativa", metricLabel: "Avance de la meta", metric: "85%" },
  },
});
