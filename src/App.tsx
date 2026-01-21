import { type MouseEvent, useCallback, useState } from "react";
import styles from "./app.module.css";
import { Dashboard } from "./components/Dashboard";
import { HomeSearchField } from "./components/HomeSearchField/";
import { Modal } from "./components/Modal";
import { useData } from "./hooks/useData";

export const App = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleOpenModal = useCallback((userId: string) => {
    setSelectedUserId(userId);
  }, []);

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  const {
    users,
    fetchData,
    isLoading,
    error,
    inputValue,
    activeRole,
    setInputValue,
    setSearchQuery,
    setActiveRole,
  } = useData();

  const selectedUser = users.find((user) => user.id === selectedUserId);
  const handleSearch = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;
    setSearchQuery(inputValue);
    setActiveRole(null);
    setIsSearching(true);
    fetchData();
  };

  return (
    <main>
      <h1 className={styles.heading}>
        <span className={styles.span}>User</span> Dashboard
      </h1>
      <HomeSearchField
        searchTerm={inputValue}
        setSearchTerm={setInputValue}
        handleSearch={handleSearch}
      />

      {isSearching && (
        <Dashboard
          activeRole={activeRole}
          setActiveRole={setActiveRole}
          fetchData={fetchData}
          isLoading={isLoading}
          error={error}
          users={users}
          handleOpenModal={handleOpenModal}
        />
      )}

      {selectedUser && (
        <Modal isOpen={!!selectedUserId} onClose={handleCloseModal} user={selectedUser} />
      )}
    </main>
  );
};
