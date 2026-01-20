import type { User } from "../../types";
import { UserCard } from "../UserCard";
import styles from "./userGrid.module.css";

type UserGridProps = {
  users: User[];
  handleOpenModal: (userId: string) => void;
};

export const UserGrid = ({ users, handleOpenModal }: UserGridProps) => {
  return (
    <div className={styles.userGrid}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} handleOpenModal={handleOpenModal} />
      ))}
    </div>
  );
};
