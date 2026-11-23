import { Icon } from "../Icon";
import styles from "./StepControls.module.scss";

type StepControlsProps = {
  subject: string;
  onStep: (direction: 1 | -1) => void;
  atStart?: boolean;
  atEnd?: boolean;
};

export const StepControls = ({ subject, onStep, atStart = false, atEnd = false }: StepControlsProps) => (
  <div className={styles.controls}>
    <button type="button" className={styles.control} aria-label={`${subject} anterior`} disabled={atStart} onClick={() => onStep(-1)} data-sound="step" data-sound-rate="0.88">
      <Icon name="chevron-left" />
    </button>
    <button type="button" className={styles.control} aria-label={`${subject} siguiente`} disabled={atEnd} onClick={() => onStep(1)} data-sound="step" data-sound-rate="1.12">
      <Icon name="chevron-right" />
    </button>
  </div>
);
