import { useEffect, useRef } from "react";
import type { User } from "../../types";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";
import styles from "./modal.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

export const Modal = ({ isOpen, onClose, user }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      dialog.focus();
    } else {
      dialog.close();
    }

    // sincronizzo state react con chiusiura DOM
    const handleClose = () => {
      onClose();
    };
    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      className={styles.modal}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      aria-labelledby="modal-title"
    >
      <Badge label={user.role} />

      <div className={styles.header}>
        <h2 id="modal-title" className={styles.name}>
          {user.name}
        </h2>
        <p className={styles.jobTitle}>{user.jobTitle}</p>
      </div>

      <dl className={styles.detailSection}>
        <dt className={styles.detailLabel}>Team:</dt>
        <dd className={styles.detailValue}>{user.team}</dd>
      </dl>

      <dl className={styles.detailSection}>
        <dt className={styles.detailLabel}>Contact information:</dt>
        <dd>
          <a href={`mailto:${user.email}`} className={styles.detailLink}>
            {user.email}
          </a>
        </dd>
      </dl>

      <dl className={styles.detailSection}>
        <dt className={styles.detailLabel}>Other details:</dt>
        <dd className={styles.detailDescription}>{user.description}</dd>
      </dl>

      <Button onClick={onClose} className={styles.modalButton} size="medium">
        Close
      </Button>
    </dialog>
  );
};
