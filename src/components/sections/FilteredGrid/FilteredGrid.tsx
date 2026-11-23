"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { FilterBar } from "@/components/primitives/FilterBar";
import styles from "./FilteredGrid.module.scss";

type FilteredGridProps<Item> = {
  label: string;
  items: readonly Item[];
  tagOf: (item: Item) => string;
  keyOf: (item: Item) => string;
  filterable?: boolean;
  render: (item: Item, index: number) => ReactNode;
};

const ALL = "Todos";

const SETTLE = { type: "spring", stiffness: 140, damping: 20 } as const;

export const FilteredGrid = <Item,>({ label, items, tagOf, keyOf, filterable = true, render }: FilteredGridProps<Item>) => {
  const [tag, setTag] = useState(ALL);
  const options = [ALL, ...new Set(items.map(tagOf))];
  const visible = tag === ALL ? items : items.filter((item) => tagOf(item) === tag);

  return (
    <>
      {filterable && <FilterBar label={label} options={options} value={tag} onChange={setTag} />}
      <ul className={styles.grid} aria-live="polite">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, index) => (
            <motion.li
              key={keyOf(item)}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={SETTLE}
            >
              {render(item, index)}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
};
