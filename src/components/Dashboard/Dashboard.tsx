import type { Dispatch, SetStateAction } from "react";
import type { Role, User } from "../../types";
import { EmptyState } from "../EmptyState";
import { ErrorState } from "../ErrorState";
import { LoadingState } from "../LoadingState";
import { RoleFilter } from "../RoleFilter";
import { UserGrid } from "../UserGrid";
import styles from "./dashboard.module.css";

type DashboardProps = {
  activeRole: Role | null;
  users: User[];
  isLoading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
  setActiveRole: Dispatch<SetStateAction<Role | null>>;
  handleOpenModal: (userId: string) => void;
};

export const Dashboard = ({
  activeRole,
  users,
  isLoading,
  error,
  setActiveRole,
  fetchData,
  handleOpenModal,
}: DashboardProps) => {
  if (isLoading) {
    return (
      <section className={styles.dashboard}>
        <LoadingState />
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.dashboard}>
        <ErrorState message={error.message} onRetry={fetchData} />
      </section>
    );
  }

  return (
    <section className={styles.dashboard}>
      <RoleFilter activeRole={activeRole} setActiveRole={setActiveRole} />
      <hr className={styles.separator} />
      <UserGrid users={users} handleOpenModal={handleOpenModal} />
    </section>
  );
};
