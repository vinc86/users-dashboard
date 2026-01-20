import { memo } from "react";
import type { User } from "../../types";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";
import styles from "./userCard.module.css";

type UserCardProps = {
  user: User;
  handleOpenModal: (userId: string) => void;
};

export const UserCard = memo(function UserCard({ user, handleOpenModal }: UserCardProps) {
  const { name, role, jobTitle, team, email } = user;
  return (
    <article className={styles.card}>
      <Badge label={role} />

      <div className={styles.detailSection}>
        <h2 className={styles.cardHeading}>{name}</h2>
        <p className={styles.cardSubHeading}>{jobTitle}</p>
      </div>

      <dl className={styles.detailSection}>
        <dt className={styles.detailLabel}>Team:</dt>
        <dd className={styles.detailText}>{team}</dd>
      </dl>

      <dl className={styles.detailSection}>
        <dt className={styles.detailLabel}>Contact information:</dt>
        <dd className={styles.detailText}>
          <a href={`mailto:${email}`} className={styles.detailEmail}>
            {email}
          </a>
        </dd>
      </dl>

      <Button onClick={() => handleOpenModal(user.id)} size="large">
        View details
      </Button>
    </article>
  );
});
