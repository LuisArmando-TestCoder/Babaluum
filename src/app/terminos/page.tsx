import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LegalBody } from "@/components/sections/LegalBody";
import { PageHero } from "@/components/sections/PageHero";
import { TERMS } from "@/content/legal";

export const metadata: Metadata = { title: "Términos y condiciones" };

const TermsPage = () => (
  <>
    <PageHero eyebrow="Legal" title="Términos y condiciones" accent="amber" companion="none" />
    <LegalBody sections={TERMS} />
    <CtaBanner />
  </>
);

export default TermsPage;
