import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import type { Roles } from "../../types";
import styles from "./button.module.css";

type ButtonSize = "small" | "medium" | "large";
type Variant = "main" | Roles;
type ButtonProps = {
  children: ReactNode;
  size?: ButtonSize;
  variant?: Variant;
  className?: string;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({
  size = "small",
  variant = "main",
  className,
  children,
  ...props
}: ButtonProps) => {
  const sizes = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  };

  const variants: Record<Variant, string> = {
    main: styles.main,
    admin: styles.admin,
    editor: styles.editor,
    viewer: styles.viewer,
    guest: styles.guest,
    owner: styles.owner,
    inactive: styles.inactive,
  };

  return (
    <button
      className={`${styles.button} ${sizes[size]} ${variants[variant]} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
