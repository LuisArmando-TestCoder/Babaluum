import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LegalBody } from "@/components/sections/LegalBody";
import { PageHero } from "@/components/sections/PageHero";
import { PRIVACY } from "@/content/legal";

export const metadata: Metadata = { title: "Aviso de privacidad" };

const PrivacyPage = () => (
  <>
    <PageHero eyebrow="Legal" title="Aviso de privacidad" accent="amber" companion="none" />
    <LegalBody sections={PRIVACY} />
    <CtaBanner />
  </>
);

export default PrivacyPage;
