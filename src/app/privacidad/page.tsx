import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { LegalBody } from "@/components/sections/LegalBody";
import { PageHero } from "@/components/sections/PageHero";
import { PRIVACY } from "@/content/legal";

export const metadata: Metadata = { title: "Política de privacidad" };

const PrivacyPage = () => (
  <>
    <PageHero eyebrow="Legal" title="Política de privacidad" accent="amber" companion="none" />
    <LegalBody sections={PRIVACY} />
    <CtaBanner />
  </>
);

export default PrivacyPage;
