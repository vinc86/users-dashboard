import { Button } from "../../ui/Button";
import styles from "./errorState.module.css";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export const ErrorState = ({ message = "An error occurred", onRetry }: ErrorStateProps) => {
  return (
    <div role="alert" className={styles.container}>
      <p className={styles.message}>{message}</p>
      {onRetry && <Button onClick={onRetry}>Retry</Button>}
    </div>
  );
};
