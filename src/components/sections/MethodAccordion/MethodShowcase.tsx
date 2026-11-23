"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Icon } from "@/components/primitives/Icon";
import { Pill } from "@/components/primitives/Pill";
import { IMAGES } from "@/content/images";
import type { BrandBoard, PhaseCard, ResultsBoard, Showcase, Sprint, SprintBoard } from "@/content/method";
import { SHOWCASE_FONTS, SHOWCASE_SWATCHES } from "@/content/method";
import type { Tone } from "@/domain/design/tone";
import styles from "./MethodShowcase.module.scss";

const rise = (index: number) => ({
  initial: { y: 220, rotate: index % 2 === 0 ? -7 : 7 },
  animate: { y: 0, rotate: 0 },
  transition: { delay: 0.15 + 0.1 * index, type: "spring", stiffness: 110, damping: 15 } as const,
});

type BoardCardProps = { index: number; children: ReactNode };

const BoardCard = ({ index, children }: BoardCardProps) => (
  <motion.article className={styles.card} {...rise(index)}>
    {children}
  </motion.article>
);

const TAG_TONES: readonly (readonly Tone[])[] = [
  ["lime", "orange", "red", "green"],
  ["sky", "navy", "purple", "red"],
  ["navy", "lime", "orange", "purple"],
];

const TAG_TILTS = [-3, 4, -5, 3];

const Phases = ({ cards }: { cards: readonly PhaseCard[] }) =>
  cards.map((card, index) => (
    <BoardCard key={card.title} index={index}>
      <h4 className={styles.centered}>{card.title}</h4>
      <p className={styles.centeredNote}>{card.duration}</p>
      <div className={styles.tags}>
        {card.tags.map((tag, position) => (
          <Pill key={tag} tone={TAG_TONES[index]?.[position]} tilt={TAG_TILTS[position]}>
            {tag}
          </Pill>
        ))}
      </div>
    </BoardCard>
  ));

const Brand = ({ palette, typography, posts }: BrandBoard) => (
  <>
    <BoardCard index={0}>
      <p className={styles.kicker}>
        <span>{palette.source}</span>
        <span>{palette.page}</span>
      </p>
      <h4 className={styles.title}>{palette.title}</h4>
      <p className={styles.note}>{palette.note}</p>
      <div className={styles.swatches}>
        {SHOWCASE_SWATCHES.map((swatch) => (
          <span key={swatch} data-accent={swatch} className={styles.swatch}>
            {swatch}
          </span>
        ))}
      </div>
    </BoardCard>
    <BoardCard index={1}>
      <h4 className={styles.title}>{typography.title}</h4>
      <p className={styles.note}>{typography.note}</p>
      <div className={styles.type}>
        <span className={styles.glyph}>Aa</span>
        <span className={styles.fonts}>
          <small>{typography.primaryLabel}</small>
          <strong className={styles.primary}>{SHOWCASE_FONTS.primary}</strong>
          <small>{typography.secondaryLabel}</small>
          <strong>{SHOWCASE_FONTS.secondary}</strong>
        </span>
      </div>
    </BoardCard>
    <BoardCard index={2}>
      <h4 className={styles.title}>{posts.title}</h4>
      <p className={styles.note}>{posts.note}</p>
      <div className={styles.post}>
        <p className={styles.postHead}>
          <span className={styles.avatar} />
          {posts.handle}
        </p>
        <div className={styles.postImage}>
          <Image src={IMAGES.sofia.src} alt={IMAGES.sofia.alt} fill sizes="260px" />
        </div>
      </div>
    </BoardCard>
  </>
);

const SprintNote = ({ title, hours, heading, body }: Sprint) => (
  <>
    <p className={styles.sprint}>
      <span className={styles.done}>
        <Icon name="check" />
      </span>
      <strong>{title}</strong>
      <small>{hours}</small>
    </p>
    <h4 className={styles.heading}>{heading}</h4>
    <p className={styles.note}>{body}</p>
  </>
);

const STICKIES = ["orange", "green", "lime", "lime", "green", "orange"] as const;

const Sprints = ({ first, notes, second }: SprintBoard) => (
  <>
    <BoardCard index={0}>
      <SprintNote {...first} />
    </BoardCard>
    <BoardCard index={1}>
      <h4 className={styles.title}>{notes.title}</h4>
      <p className={styles.note}>{notes.note}</p>
      <div className={styles.stickies} aria-hidden="true">
        {STICKIES.map((accent, index) => (
          <span key={`${accent}-${index}`} data-accent={accent} className={styles.sticky} />
        ))}
      </div>
    </BoardCard>
    <BoardCard index={2}>
      <SprintNote {...second} />
    </BoardCard>
  </>
);

const BARS = [
  { value: 10.5, accent: "purple" },
  { value: 8.3, accent: "lime" },
  { value: 5.7, accent: "purple" },
  { value: 6.8, accent: "lime" },
  { value: 7.4, accent: "purple" },
  { value: 10.9, accent: "lime" },
] as const;

const TALLEST = 11;

const barStyle = (value: number, index: number) => ({ "--level": value / TALLEST, "--delay": `${300 + index * 70}ms` }) as CSSProperties;

const Results = ({ chart, campaign }: ResultsBoard) => (
  <>
    <BoardCard index={0}>
      <div className={styles.chart}>
        <div>
          <h4 className={styles.heading}>{chart.title}</h4>
          <p className={styles.note}>{chart.body}</p>
        </div>
        <div className={styles.bars}>
          {BARS.map((bar, index) => (
            <span key={bar.value} className={styles.bar} data-accent={bar.accent} style={barStyle(bar.value, index)}>
              <small>{bar.value}</small>
            </span>
          ))}
        </div>
      </div>
      <p className={styles.caption}>{chart.caption}</p>
    </BoardCard>
    <BoardCard index={1}>
      <h4 className={styles.title}>{campaign.title}</h4>
      <p className={styles.note}>{campaign.note}</p>
      <p className={styles.metricLabel}>{campaign.metricLabel}</p>
      <p className={styles.metric}>{campaign.metric}</p>
      <span className={styles.meter} />
    </BoardCard>
  </>
);

const Board = ({ showcase }: { showcase: Showcase }) => {
  if (showcase.kind === "phases") return <Phases cards={showcase.cards} />;
  if (showcase.kind === "brand") return <Brand {...showcase} />;
  return showcase.kind === "sprints" ? <Sprints {...showcase} /> : <Results {...showcase} />;
};

export const MethodShowcase = ({ showcase }: { showcase: Showcase }) => (
  <div className={styles.showcase} data-kind={showcase.kind}>
    <Board showcase={showcase} />
  </div>
);
