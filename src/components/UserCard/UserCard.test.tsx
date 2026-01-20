import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UserCard } from "./UserCard";

const mockUser = {
  id: "1",
  name: "John Doe",
  role: "admin" as const,
  jobTitle: "Developer",
  team: "Engineering",
  email: "john@example.com",
  description: "A test user",
};

describe("UserCard", () => {
  const mockHandleOpenModal = vi.fn();

  beforeEach(() => {
    mockHandleOpenModal.mockClear();
  });

  it("should render user information", () => {
    render(<UserCard user={mockUser} handleOpenModal={mockHandleOpenModal} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Developer")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument(); // Badge
  });

  it("should render email as mailto link", () => {
    render(<UserCard user={mockUser} handleOpenModal={mockHandleOpenModal} />);

    const emailLink = screen.getByRole("link", { name: "john@example.com" });
    expect(emailLink).toHaveAttribute("href", "mailto:john@example.com");
  });

  it("should call handleOpenModal with user id on button click", async () => {
    const user = userEvent.setup();
    render(<UserCard user={mockUser} handleOpenModal={mockHandleOpenModal} />);

    const button = screen.getByRole("button", { name: /view details/i });
    await user.click(button);

    expect(mockHandleOpenModal).toHaveBeenCalledWith("1");
  });
});
