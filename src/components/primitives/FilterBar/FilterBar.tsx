import styles from "./FilterBar.module.scss";

type FilterBarProps = {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
};

export const FilterBar = ({ label, options, value, onChange }: FilterBarProps) => (
  <div role="group" aria-label={label} className={styles.bar}>
    {options.map((option) => (
      <button key={option} type="button" className={styles.chip} aria-pressed={option === value} onClick={() => onChange(option)}>
        {option}
      </button>
    ))}
  </div>
);
