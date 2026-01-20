import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { usersMockData } from "../api/data";
import { mockUsers } from "../mocks";
import { useData } from "./useData";

vi.mock("../api/data", () => ({
  usersMockData: vi.fn(),
}));

describe("useData", () => {
  it("should initialize with empty users and not loading", () => {
    const { result } = renderHook(() => useData());
    const users = result.current.users;
    const isLoading = result.current.isLoading;

    expect(users).toHaveLength(0);
    expect(isLoading).toBeFalsy();
  });

  it("should fetch and set users on fetchData call", async () => {
    vi.mocked(usersMockData).mockResolvedValue(new Response(JSON.stringify(mockUsers)));

    const { result } = renderHook(() => useData());

    await act(async () => {
      result.current.fetchData();
    });

    const users = result.current.users;
    expect(users).toHaveLength(3);
    expect(users[0].name).toBe("George Harris");
  });

  it("should handle fetch errors", async () => {
    const errorMessage = "Error fetching data";
    vi.mocked(usersMockData).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useData());

    await act(async () => {
      await result.current.fetchData();
    });

    const error = result.current.error;
    const users = result.current.users;
    const isLoading = result.current.isLoading;

    expect(error?.message).toBe(errorMessage);
    expect(users).toHaveLength(0);
    expect(isLoading).toBe(false);
  });

  it("should filter users by search query", async () => {
    vi.mocked(usersMockData).mockResolvedValue(new Response(JSON.stringify(mockUsers)));

    const { result } = renderHook(() => useData());

    await act(async () => {
      await result.current.fetchData();
    });

    act(() => {
      result.current.setSearchQuery("George");
    });

    expect(result.current.users).toHaveLength(1);
    expect(result.current.users[0].name).toContain("George");
  });

  it("should filter users by active role", async () => {
    vi.mocked(usersMockData).mockResolvedValue(new Response(JSON.stringify(mockUsers)));

    const { result } = renderHook(() => useData());

    await act(async () => {
      await result.current.fetchData();
    });

    act(() => {
      result.current.setActiveRole("admin");
    });

    expect(result.current.users.every((user) => user.role === "admin")).toBe(true);
  });

  it("should combine search and role filters", async () => {
    vi.mocked(usersMockData).mockResolvedValue(new Response(JSON.stringify(mockUsers)));

    const { result } = renderHook(() => useData());

    await act(async () => {
      await result.current.fetchData();
    });

    act(() => {
      result.current.setSearchQuery("George");
      result.current.setActiveRole("admin");
    });

    expect(
      result.current.users.every((user) => user.name.includes("George") && user.role === "admin"),
    ).toBe(true);
  });
});
