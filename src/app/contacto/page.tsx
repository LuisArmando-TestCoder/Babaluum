import type { Metadata } from "next";
import { ContactCards } from "@/components/sections/ContactCards";
import { ContactForm } from "@/components/sections/ContactForm";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = { title: "Contacto" };

const ContactPage = () => (
  <>
    <PageHero eyebrow="Contacto" title="Conectemos" lead="Escríbenos, visítanos o llámanos. Nos encanta conocer ideas nuevas." accent="purple" />
    <ContactCards />
    <ContactForm />
    <FaqSection />
    <CtaBanner />
  </>
);

export default ContactPage;
