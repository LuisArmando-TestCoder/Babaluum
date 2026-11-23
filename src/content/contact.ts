import { PLANS } from "./plans";
import { PROGRAMS } from "./programs";

type Interest = { plan?: string | null; programa?: string | null };

export const subjectFor = ({ plan, programa }: Interest): string => {
  const chosenPlan = PLANS.find((item) => item.id === plan);
  if (chosenPlan) return `Quiero el plan ${chosenPlan.name}`;
  const chosenProgram = PROGRAMS.find((item) => item.slug === programa);
  return chosenProgram ? `Me interesa el programa ${chosenProgram.title}` : "";
};
