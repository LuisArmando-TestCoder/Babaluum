import type { Metadata } from "next";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { NewsletterBand } from "@/components/sections/NewsletterBand";
import { STUDIO, STUDIO_NEWSLETTER } from "@/content/studio";

export const metadata: Metadata = { title: "Babaluum Studio", description: STUDIO.text };

const StudioPage = () => (
  <>
    <ComingSoon copy={STUDIO} />
    <NewsletterBand copy={STUDIO_NEWSLETTER} />
  </>
);

export default StudioPage;
