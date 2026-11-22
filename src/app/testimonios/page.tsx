import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { ReviewsGrid } from "@/components/sections/ReviewsGrid";
import { TestimonialSpotlight } from "@/components/sections/TestimonialSpotlight";

export const metadata: Metadata = { title: "Testimonios" };

const ReviewsPage = () => (
  <>
    <PageHero eyebrow="Testimonios" title="Lo que dice la comunidad" lead="Historias reales de personas que crearon con propósito." accent="green" />
    <ReviewsGrid />
    <TestimonialSpotlight />
    <CtaBanner />
  </>
);

export default ReviewsPage;
