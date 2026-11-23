import { FeaturedCarousel } from "@/components/sections/FeaturedCarousel";
import { FounderQuote } from "@/components/sections/FounderQuote";
import { HomeHero } from "@/components/sections/HomeHero";
import { ImpactBanner } from "@/components/sections/ImpactBanner";
import { MethodAccordion } from "@/components/sections/MethodAccordion";
import { NewsletterBand } from "@/components/sections/NewsletterBand";
import { ProgramsGrid } from "@/components/sections/ProgramsGrid";
import { StudioBand } from "@/components/sections/StudioBand";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { FOUNDER } from "@/content/founder";
import { HOME } from "@/content/home";
import { NEWSLETTER } from "@/content/newsletter";
import { POST_SLIDES } from "@/content/posts";
import { STUDIO_BAND } from "@/content/studio";

const HomePage = () => (
  <>
    <HomeHero copy={HOME.hero} />
    <ProgramsGrid {...HOME.integrated} />
    <WhyChoose {...HOME.whyChoose} />
    <MethodAccordion copy={HOME.method} />
    <ImpactBanner copy={HOME.impact} />
    <FeaturedCarousel {...HOME.blogs} slides={POST_SLIDES} />
    <FounderQuote copy={FOUNDER} />
    <NewsletterBand copy={NEWSLETTER} />
    <StudioBand copy={STUDIO_BAND} />
  </>
);

export default HomePage;
