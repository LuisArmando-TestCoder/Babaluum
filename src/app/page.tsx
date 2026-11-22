import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { HomeHero } from "@/components/sections/HomeHero";
import { ImpactBanner } from "@/components/sections/ImpactBanner";
import { MethodAccordion } from "@/components/sections/MethodAccordion";
import { ProgramsGrid } from "@/components/sections/ProgramsGrid";
import { TestimonialSpotlight } from "@/components/sections/TestimonialSpotlight";
import { WhyChoose } from "@/components/sections/WhyChoose";

const HomePage = () => (
  <>
    <HomeHero />
    <ProgramsGrid />
    <WhyChoose />
    <MethodAccordion />
    <ImpactBanner />
    <FeaturedProjects />
    <TestimonialSpotlight />
    <FaqSection />
    <CtaBanner />
  </>
);

export default HomePage;
