import styles from "./emptyState.module.css";

type EmptyStateProps = {
  message?: string;
};

export const EmptyState = ({ message = "No results found" }: EmptyStateProps) => {
  return (
    <output aria-live="polite" className={styles.container}>
      <p className={styles.message}>{message}</p>
    </output>
  );
};
