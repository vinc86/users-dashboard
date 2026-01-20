import type { Dispatch, SetStateAction } from "react";

export type Role = "admin" | "editor" | "viewer" | "guest" | "owner" | "inactive";

export type User = {
  id: string;
  name: string;
  role: Role;
  jobTitle: string;
  team: string;
  email: string;
  description: string;
};

export type Data = {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setActiveRole: Dispatch<SetStateAction<Role | null>>;
  fetchData: () => Promise<void>;
};
