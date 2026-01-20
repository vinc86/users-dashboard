import type { Dispatch, SetStateAction } from "react";

import type { Role } from "../../types/types";
import { Button } from "../../ui/Button";
import { ROLES } from "../../utils";

import styles from "./roleFilter.module.css";

type FilterProps = {
  activeRole: Role | null;
  setActiveRole: Dispatch<SetStateAction<Role | null>>;
};

export const RoleFilter = ({ setActiveRole, activeRole }: FilterProps) => {
  return (
    <section className={styles.filterSection}>
      <p className={styles.filterParagraph}>FILTER BY: </p>
      <div className={styles.filterWrapper}>
        {ROLES.map((role) => {
          const isActiveRole = activeRole === role;
          return (
            <Button
              aria-pressed={isActiveRole}
              key={role}
              onClick={() => setActiveRole(role)}
              size="small"
              variant={role}
            >
              {role}
            </Button>
          );
        })}
      </div>
    </section>
  );
};
