import { useId } from "react";
import { Icon } from "../Icon";
import styles from "./PillField.module.scss";

type PillFieldProps = {
  name: string;
  label: string;
  action: string;
  type?: "text" | "email";
  autoComplete?: string;
  autoFocus?: boolean;
  busy?: boolean;
  invalid?: boolean;
  describedBy?: string;
};

export const PillField = ({ name, label, action, type = "text", autoComplete, autoFocus = false, busy = false, invalid = false, describedBy }: PillFieldProps) => {
  const id = useId();
  return (
    <div className={styles.pill} data-invalid={invalid}>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        readOnly={busy}
        placeholder=" "
        className={styles.input}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <button type="submit" className={styles.go} aria-label={action} disabled={busy} data-busy={busy} data-sound="none" data-cursor="hide">
        <Icon name="arrow-right" />
      </button>
    </div>
  );
};
