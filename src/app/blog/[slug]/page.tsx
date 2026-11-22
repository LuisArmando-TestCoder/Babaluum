import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { POSTS, findPost, formatPostDate } from "@/content/posts";

type PostPageProps = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => POSTS.map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: PostPageProps): Promise<Metadata> => {
  const post = findPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
};

const PostPage = async ({ params }: PostPageProps) => {
  const post = findPost((await params).slug);
  if (!post) notFound();
  const related = POSTS.filter((candidate) => candidate.slug !== post.slug).slice(0, 2);
  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} lead={`${post.author} · ${formatPostDate(post.date)}`} align="start" companion="alien" />
      <ArticleBody post={post} />
      <BlogGrid posts={related} title="Sigue leyendo" />
      <FaqSection />
      <CtaBanner />
    </>
  );
};

export default PostPage;
