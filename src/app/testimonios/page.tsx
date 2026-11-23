import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { TestimonialSpotlight } from "@/components/sections/TestimonialSpotlight";

export const metadata: Metadata = { title: "Testimonios" };

const ReviewsPage = () => (
  <>
    <PageHero eyebrow="Testimonios" title="Historias de la comunidad" lead="Aquí vamos a reunir las experiencias de quienes forman parte de Babaluum. Mientras tanto, te dejamos las palabras de nuestra fundadora." accent="green" />
    <TestimonialSpotlight />
    <CtaBanner />
  </>
);

export default ReviewsPage;
