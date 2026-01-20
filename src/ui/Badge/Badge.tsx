import type { Role } from "../../types";

import styles from "./badge.module.css";

type BadgeProps = {
  label: Role;
};
export const Badge = ({ label }: BadgeProps) => {
  const background: Record<Role, string> = {
    admin: styles.admin,
    editor: styles.editor,
    viewer: styles.viewer,
    guest: styles.guest,
    owner: styles.owner,
    inactive: styles.inactive,
  };
  return <span className={`${styles.badge} ${background[label]}`}>{label}</span>;
};
