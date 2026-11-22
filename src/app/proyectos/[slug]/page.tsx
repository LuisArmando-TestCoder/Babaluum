import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { TestimonialSpotlight } from "@/components/sections/TestimonialSpotlight";
import { PROJECTS, findProject } from "@/content/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => PROJECTS.map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
  const project = findProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const project = findProject((await params).slug);
  if (!project) notFound();
  return (
    <>
      <PageHero eyebrow="Detalle del proyecto" title={project.title} lead={project.summary} align="start" accent="orange" />
      <ProjectDetail project={project} />
      <TestimonialSpotlight layout="centered" />
      <CtaBanner />
    </>
  );
};

export default ProjectPage;
