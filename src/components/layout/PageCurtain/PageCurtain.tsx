import styles from "./PageCurtain.module.scss";

export const PageCurtain = () => (
  <div className={styles.curtain} aria-hidden="true">
    <span className={styles.mark} />
    <svg viewBox="0 0 180 60" className={styles.tail}>
      <path d="M30 0 A60 60 0 0 0 90 60 A60 60 0 0 0 150 0 Z" />
    </svg>
  </div>
);
