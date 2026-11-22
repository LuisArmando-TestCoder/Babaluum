import type { Metadata } from "next";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureSplit } from "@/components/sections/FeatureSplit";
import { PageHero } from "@/components/sections/PageHero";
import { POSTS } from "@/content/posts";

export const metadata: Metadata = { title: "Blog y podcast" };

const BlogPage = () => {
  const [latest, ...rest] = POSTS;
  return (
    <>
      <PageHero eyebrow="¿Cómo lo hacen?" title="Blog y podcast" lead="Ideas, guías y conversaciones con quienes ya lo lograron." companion="globe" />
      {latest && (
        <FeatureSplit title={latest.title} body={latest.excerpt} image={latest.cover} cta={{ label: "Leer artículo", href: `/blog/${latest.slug}` }} />
      )}
      <BlogGrid posts={rest} />
      <FaqSection />
      <CtaBanner />
    </>
  );
};

export default BlogPage;
