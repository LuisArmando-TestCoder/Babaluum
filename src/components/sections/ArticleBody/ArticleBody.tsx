import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/primitives/Button";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import type { Post } from "@/content/posts";
import styles from "./ArticleBody.module.scss";

type ArticleBodyProps = { post: Post };

export const ArticleBody = ({ post }: ArticleBodyProps) => (
  <Section spacing="l">
    <Media image={post.cover} ratio="1280 / 610" notches={NOTCHES.article} priority sizes="100vw" className={styles.cover} />
    <article>
      <Reveal className={styles.chapter}>
        <h2 className={styles.heading}>De qué trata</h2>
        <p className={styles.paragraph}>{post.excerpt}</p>
        <p className={styles.paragraph}>El artículo completo está publicado en babaluum.com.</p>
        <Button href={post.source} variant="dark" size="l">
          Leer el artículo completo
        </Button>
      </Reveal>
    </article>
  </Section>
);
