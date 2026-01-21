import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { mockUsers } from "../../mocks";
import { Dashboard } from "./Dashboard";
import userEvent from "@testing-library/user-event";

describe("Dashboard", () => {
  const defaultProps = {
    users: mockUsers,
    isLoading: false,
    error: null,
    activeRole: null,
    fetchData: vi.fn(),
    setActiveRole: vi.fn(),
    handleOpenModal: vi.fn(),
  };

  it("should render LoadingState when isLoading is true", () => {
    render(<Dashboard {...defaultProps} isLoading={true} />);

    expect(screen.getByText("Loading results, please wait...")).toBeInTheDocument();
  });

  it("should render ErrorState when error exists", () => {
    const error = new Error("Something went wrong");
    render(<Dashboard {...defaultProps} error={error} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("should render EmptyState when filter doesn't return results", async () => {
    const user = userEvent.setup();
    render(<Dashboard {...defaultProps} />);
    const viewerButton = screen.getByRole("button", { name: "viewer" });
    await user.click(viewerButton);
    waitFor(() => {
      expect(screen.getByRole("output")).toBeInTheDocument();
    });
  });

  it("should render EmptyState when users array is empty", () => {
    render(<Dashboard {...defaultProps} users={[]} />);

    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  it("should render UserGrid when users exist", () => {
    render(<Dashboard {...defaultProps} />);

    expect(screen.getByText("George Harris")).toBeInTheDocument();
    expect(screen.getByText("Arianna Russo")).toBeInTheDocument();
  });

  it("should render RoleFilter", () => {
    render(<Dashboard {...defaultProps} />);

    expect(screen.getByText("FILTER BY:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /admin/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /editor/i })).toBeInTheDocument();
  });
});
