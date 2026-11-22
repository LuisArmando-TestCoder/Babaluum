import { cx } from "@/domain/design/cx";
import styles from "./Field.module.scss";

type FieldProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  multiline?: boolean;
  required?: boolean;
  className?: string;
};

export const Field = ({ name, label, type = "text", multiline = false, required = false, className }: FieldProps) => (
  <label className={cx(styles.field, className)}>
    <span className={styles.label}>{label}</span>
    {multiline ? (
      <textarea name={name} required={required} rows={4} className={styles.control} />
    ) : (
      <input name={name} type={type} required={required} className={styles.control} />
    )}
  </label>
);
