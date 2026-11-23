import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MissionSplit } from "@/components/sections/MissionSplit";
import { NewsletterBand } from "@/components/sections/NewsletterBand";
import { PageHero } from "@/components/sections/PageHero";
import { ProgramsList } from "@/components/sections/ProgramsList";
import { Statement } from "@/components/sections/Statement";
import { NEWSLETTER } from "@/content/newsletter";
import { PROGRAM_PAGES, findProgramPage } from "@/content/programPages";

type ProgramPageProps = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => PROGRAM_PAGES.map(({ slug }) => ({ slug }));

export const generateMetadata = async ({ params }: ProgramPageProps): Promise<Metadata> => {
  const page = findProgramPage((await params).slug);
  return page ? { title: page.title, description: page.hook } : {};
};

const ProgramPage = async ({ params }: ProgramPageProps) => {
  const page = findProgramPage((await params).slug);
  if (!page) notFound();
  return (
    <>
      <PageHero eyebrow="Programa" title={page.title} lead={page.hook} accent={page.accent} companion={page.companion} />
      <Statement {...page.promise} />
      <MissionSplit {...page.about} emphasis="loud" />
      <ProgramsList {...page.tracks} />
      <NewsletterBand copy={page.waitlist ?? NEWSLETTER} />
    </>
  );
};

export default ProgramPage;
