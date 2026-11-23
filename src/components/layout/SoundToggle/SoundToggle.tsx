"use client";

import { Icon } from "@/components/primitives/Icon";
import { cx } from "@/domain/design/cx";
import { useSound } from "@/providers/Sound";
import styles from "./SoundToggle.module.scss";

type SoundToggleProps = { placement: "bar" | "dock" };

export const SoundToggle = ({ placement }: SoundToggleProps) => {
  const { muted, toggleMute } = useSound();
  return (
    <button
      type="button"
      className={cx(styles.toggle, styles[placement])}
      aria-pressed={!muted}
      aria-label={muted ? "Activar sonidos" : "Silenciar sonidos"}
      onClick={toggleMute}
      data-sound="none"
      data-burst={muted ? "" : undefined}
    >
      <Icon name={muted ? "sound-off" : "sound-on"} />
    </button>
  );
};
