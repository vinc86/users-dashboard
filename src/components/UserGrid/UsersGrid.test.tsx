import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { mockUsers } from "../../mocks";
import { UserGrid } from "./UserGrid";

describe("UsersGrid", () => {
  const handleOpenModal = vi.fn();
  it("should display users", () => {
    render(<UserGrid handleOpenModal={handleOpenModal} users={mockUsers} />);
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(mockUsers.length);
  });
});
