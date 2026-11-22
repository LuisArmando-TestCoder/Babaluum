import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { ImpactBanner } from "@/components/sections/ImpactBanner";
import { PageHero } from "@/components/sections/PageHero";
import { PricingList } from "@/components/sections/PricingList";
import { ReviewsGrid } from "@/components/sections/ReviewsGrid";
import { ValuesRow } from "@/components/sections/ValuesRow";

export const metadata: Metadata = { title: "Planes" };

const PlansPage = () => (
  <>
    <PageHero eyebrow="Planes" title="Planes de membresía" lead="Elige cómo quieres crecer con la comunidad Babaluum." accent="lime" companion="globe" />
    <PricingList />
    <ValuesRow />
    <ImpactBanner />
    <ReviewsGrid limit={2} withHeader />
    <FaqSection />
    <CtaBanner />
  </>
);

export default PlansPage;
