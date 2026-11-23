import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { ImpactBanner } from "@/components/sections/ImpactBanner";
import { PageHero } from "@/components/sections/PageHero";
import { PricingList } from "@/components/sections/PricingList";
import { ValuesRow } from "@/components/sections/ValuesRow";

export const metadata: Metadata = { title: "Cómo participar" };

const PlansPage = () => (
  <>
    <PageHero eyebrow="Planes" title="Cómo participar" lead="Suscríbete gratis, súmate a un programa o colabora como aliado." accent="lime" companion="globe" />
    <PricingList />
    <ValuesRow accent="purple" />
    <ImpactBanner />
    <FaqSection />
    <CtaBanner />
  </>
);

export default PlansPage;
