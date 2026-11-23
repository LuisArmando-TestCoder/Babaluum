"use client";

import { PostCard } from "@/components/cards/PostCard";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import type { Post } from "@/content/posts";
import { formatPostDate } from "@/content/posts";
import { FilteredGrid } from "../FilteredGrid";

type BlogGridProps = { posts: readonly Post[]; title?: string; filterable?: boolean };

const renderPost = (post: Post) => (
  <PostCard
    href={`/blog/${post.slug}`}
    title={post.title}
    excerpt={post.excerpt}
    category={post.category}
    author={post.author}
    date={formatPostDate(post.date)}
    cover={post.cover}
  />
);

export const BlogGrid = ({ posts, title = "Todos los artículos", filterable = true }: BlogGridProps) => (
  <Section spacing="m">
    <SectionHeader eyebrow="Blog y podcast" accent="red" title={title} measure="narrow" aside="Ideas, guías y conversaciones para crear con propósito." />
    <FilteredGrid label="Filtrar artículos por tema" items={posts} tagOf={(post) => post.category} keyOf={(post) => post.slug} filterable={filterable} render={renderPost} />
  </Section>
);
