import type { User } from "../../types";
import { EmptyState } from "../EmptyState";
import { UserCard } from "../UserCard";
import styles from "./userGrid.module.css";

type UserGridProps = {
  users: User[];
  handleOpenModal: (userId: string) => void;
};

export const UserGrid = ({ users, handleOpenModal }: UserGridProps) => {
  if (users.length === 0) {
    return (
      <section className={styles.dashboard}>
        <EmptyState message="No users with this role" />
      </section>
    );
  }
  return (
    <div className={styles.userGrid}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} handleOpenModal={handleOpenModal} />
      ))}
    </div>
  );
};
