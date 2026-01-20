import { useCallback, useMemo, useState } from "react";
import { usersMockData } from "../api/data";
import type { Role, User } from "../types";

export const useData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [inputValue, setInputValue] = useState(""); // valore input locale
  const [searchQuery, setSearchQuery] = useState(""); // query effettiva per filtro
  const [activeRole, setActiveRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // filtro i risultati in base alla ricerca o al ruolo
  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        const matchesName = user.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = activeRole ? user.role === activeRole : true;
        return matchesName && matchesRole;
      }),
    [users, searchQuery, activeRole],
  );

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await usersMockData();
      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Random Error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    activeRole,
    users: filteredUsers,
    isLoading,
    error,
    inputValue,
    setInputValue,
    searchQuery,
    setSearchQuery,
    setActiveRole,
    fetchData,
  };
};
