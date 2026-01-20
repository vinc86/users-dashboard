import type { Dispatch, MouseEvent, SetStateAction } from "react";
import searchSVG from "../../assets/icons/search.svg";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";

import styles from "./homeSearchField.module.css";

type SearchProps = {
  handleSearch: (e: MouseEvent<HTMLFormElement>) => void;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

export const HomeSearchField = ({ handleSearch, searchTerm, setSearchTerm }: SearchProps) => {
  return (
    <form onSubmit={handleSearch} className={styles.section}>
      <label htmlFor="user-search" className={styles.inputLabel}>
        What are you looking for?
      </label>
      <div className={styles.inputWrapper}>
        <Input
          id="user-search"
          name="user-search"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button aria-label="Search user" type="submit" className={styles.buttonMobile}>
          <img src={searchSVG} alt="" />
        </Button>
        <Button type="submit" className={styles.buttonDesktop}>
          Search
        </Button>
      </div>
    </form>
  );
};
