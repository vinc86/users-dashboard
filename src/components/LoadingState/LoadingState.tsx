import loadingSVG from "../../assets/icons/loader.svg";
import styles from "./loadingState.module.css";

export const LoadingState = () => {
  return (
    <output aria-live="polite" aria-label="Loading results" className={styles.container}>
      <p className={styles.message}>Loading results, please wait...</p>
      <img src={loadingSVG} alt="" className={styles.spinner} />
    </output>
  );
};
