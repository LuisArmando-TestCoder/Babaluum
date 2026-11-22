import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Heading, Highlight } from "@/components/primitives/Heading";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import type { Post } from "@/content/posts";
import { IMAGES } from "@/content/images";
import styles from "./ArticleBody.module.scss";

type ArticleBodyProps = { post: Post };

export const ArticleBody = ({ post }: ArticleBodyProps) => {
  const [first, second, ...rest] = post.sections;
  return (
    <Section spacing="m">
      <Media image={post.cover} ratio="16 / 8" notches={NOTCHES.banner} priority sizes="100vw" className={styles.cover} />
      <article className={styles.article}>
        <Reveal>
          <h2 className={styles.heading}>Introducción</h2>
          <p className={styles.paragraph}>{post.excerpt}</p>
        </Reveal>
        {[first, second].filter((section) => section !== undefined).map((section) => (
          <Reveal key={section.heading}>
            <h2 className={styles.heading}>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </Reveal>
        ))}
        <Heading size="h2" className={styles.pull}>
          {post.pullQuote.lead} <Highlight>{post.pullQuote.highlight}</Highlight>
        </Heading>
        <div className={styles.pair}>
          <Parallax speed={0.06}>
            <Media image={IMAGES.sketchbook} ratio="1 / 1" notches={NOTCHES.portrait} />
          </Parallax>
          <Parallax speed={0.14}>
            <Media image={IMAGES.avatar} ratio="1 / 1" notches={NOTCHES.side} />
          </Parallax>
        </div>
        {rest.map((section) => (
          <Reveal key={section.heading}>
            <h2 className={styles.heading}>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </Reveal>
        ))}
      </article>
    </Section>
  );
};
