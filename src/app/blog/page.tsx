import type { Metadata } from "next";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureSlider } from "@/components/sections/FeatureSlider";
import { PageHero } from "@/components/sections/PageHero";
import { POSTS } from "@/content/posts";

export const metadata: Metadata = { title: "Blog y podcast" };

const LATEST = POSTS.slice(0, 4).map((post) => ({
  key: post.slug,
  title: post.title,
  body: post.excerpt,
  image: post.cover,
  href: `/blog/${post.slug}`,
}));

const BlogPage = () => (
  <>
    <PageHero eyebrow="¿Cómo lo hacen?" title="Blog y podcast" lead="Ideas, guías y conversaciones con quienes ya lo lograron." companion="globe" />
    <FeatureSlider subject="Artículo" slides={LATEST} ctaLabel="Leer artículo" />
    <BlogGrid posts={POSTS} />
    <FaqSection />
    <CtaBanner />
  </>
);

export default BlogPage;
