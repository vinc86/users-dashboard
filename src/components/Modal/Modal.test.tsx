import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { setupMain } from "@testing-library/user-event/dist/cjs/setup/setup.js";
import { describe, expect, it, vi } from "vitest";
import type { Role } from "../../types";
import { Modal } from "./Modal";

const mockUser = {
  id: "1",
  name: "John Doe",
  role: "admin" as Role,
  jobTitle: "Developer",
  team: "Engineering",
  email: "john@example.com",
  description: "A test user description",
};

describe("Modal", () => {
  let user: ReturnType<typeof setupMain>;

  const mockOnClose = vi.fn();

  beforeEach(() => {
    user = userEvent.setup();
    mockOnClose.mockClear();
    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute("open");
    });
  });

  it("should render user details when open", () => {
    render(<Modal isOpen user={mockUser} onClose={mockOnClose} />);

    expect(screen.getByText("A test user description")).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", async () => {
    render(<Modal isOpen user={mockUser} onClose={mockOnClose} />);
    const button = screen.getByRole("button", { name: "Close" });

    await user.click(button);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should call onClose on backdrop click", async () => {
    render(<Modal isOpen user={mockUser} onClose={mockOnClose} />);
    const dialog = screen.getByRole("dialog");

    await user.click(dialog);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
