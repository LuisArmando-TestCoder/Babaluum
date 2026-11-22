import { PostCard } from "@/components/cards/PostCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import type { Post } from "@/content/posts";
import { formatPostDate } from "@/content/posts";
import styles from "./BlogGrid.module.scss";

type BlogGridProps = { posts: readonly Post[]; title?: string };

export const BlogGrid = ({ posts, title = "Todos los artículos" }: BlogGridProps) => (
  <Section spacing="m">
    <SectionHeader eyebrow="Blog y podcast" accent="red" title={title} aside="Ideas, guías y conversaciones para crear con propósito." />
    <RevealGroup as="ul" className={styles.grid}>
      {posts.map((post) => (
        <RevealItem as="li" key={post.slug}>
          <PostCard
            href={`/blog/${post.slug}`}
            title={post.title}
            excerpt={post.excerpt}
            category={post.category}
            author={post.author}
            date={formatPostDate(post.date)}
            cover={post.cover}
          />
        </RevealItem>
      ))}
    </RevealGroup>
  </Section>
);
