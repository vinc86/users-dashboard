import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ROLES } from "../../utils";
import { RoleFilter } from "./RoleFilter";

describe("RoleFilter", () => {
  const mockSetActiveRole = vi.fn();

  beforeEach(() => {
    mockSetActiveRole.mockClear();
  });

  it("should render all role filter buttons", () => {
    render(<RoleFilter activeRole={null} setActiveRole={mockSetActiveRole} />);

    for (const role of ROLES) {
      expect(screen.getByRole("button", { name: role })).toBeInTheDocument();
    }
  });

  it("should call setActiveRole when a role button is clicked", async () => {
    const user = userEvent.setup();
    render(<RoleFilter activeRole={null} setActiveRole={mockSetActiveRole} />);

    const adminButton = screen.getByRole("button", { name: "admin" });
    await user.click(adminButton);

    expect(mockSetActiveRole).toHaveBeenCalledWith("admin");
  });

  it("should show active state for selected role", () => {
    render(<RoleFilter activeRole="editor" setActiveRole={mockSetActiveRole} />);

    const editorButton = screen.getByRole("button", { name: "editor" });
    const adminButton = screen.getByRole("button", { name: "admin" });

    expect(editorButton).toHaveAttribute("aria-pressed", "true");
    expect(adminButton).toHaveAttribute("aria-pressed", "false");
  });
});
