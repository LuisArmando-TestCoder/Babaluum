import { cx } from "@/domain/design/cx";
import styles from "./Field.module.scss";

type FieldProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  multiline?: boolean;
  required?: boolean;
  defaultValue?: string;
  error?: string;
  className?: string;
};

export const Field = ({ name, label, type = "text", autoComplete, multiline = false, required = false, defaultValue, error, className }: FieldProps) => {
  const errorId = `${name}-error`;
  const control = {
    name,
    required,
    defaultValue,
    autoComplete,
    className: styles.control,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };
  return (
    <label className={cx(styles.field, className)} data-invalid={Boolean(error)}>
      <span className={styles.label}>
        {label}
        {!required && <small className={styles.optional}>Opcional</small>}
      </span>
      {multiline ? <textarea {...control} rows={3} /> : <input {...control} type={type} />}
      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </label>
  );
};
