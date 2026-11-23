import { Reveal } from "@/components/motion/Reveal";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { Heading } from "@/components/primitives/Heading";
import { Media } from "@/components/primitives/Media";
import { NOTCHES } from "@/components/primitives/NotchedSurface";
import { Section } from "@/components/primitives/Section";
import { IMAGES } from "@/content/images";
import type { Post, PostSection } from "@/content/posts";
import { twoTone } from "@/domain/design/words";
import styles from "./ArticleBody.module.scss";

type ArticleBodyProps = { post: Post };

const Chapter = ({ section }: { section: PostSection }) => (
  <Reveal className={styles.chapter}>
    <h2 className={styles.heading}>{section.heading}</h2>
    {section.paragraphs.map((paragraph) => (
      <p key={paragraph} className={styles.paragraph}>
        {paragraph}
      </p>
    ))}
  </Reveal>
);

const PULL_QUOTE_AFTER = 1;
const GALLERY_AFTER = 3;

export const ArticleBody = ({ post }: ArticleBodyProps) => {
  const intro: PostSection = { heading: "Introducción", paragraphs: [post.excerpt] };
  const chapters = [intro, ...post.sections];
  return (
    <Section spacing="l">
      <Media image={post.cover} ratio="1280 / 610" notches={NOTCHES.article} priority sizes="100vw" className={styles.cover} />
      <article>
        {chapters.slice(0, PULL_QUOTE_AFTER + 1).map((section) => (
          <Chapter key={section.heading} section={section} />
        ))}
        <Heading size="h2" className={styles.pull}>
          <ScrubWords segments={twoTone(post.pullQuote.lead, post.pullQuote.highlight)} />
        </Heading>
        {chapters.slice(PULL_QUOTE_AFTER + 1, GALLERY_AFTER + 1).map((section) => (
          <Chapter key={section.heading} section={section} />
        ))}
        <div className={styles.pair}>
          <Media image={IMAGES.sketchbook} ratio="620 / 660" notches={NOTCHES.portrait} />
          <Media image={IMAGES.avatar} ratio="620 / 660" notches={NOTCHES.side} />
        </div>
        {chapters.slice(GALLERY_AFTER + 1).map((section) => (
          <Chapter key={section.heading} section={section} />
        ))}
      </article>
    </Section>
  );
};
