import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HomeSearchField } from "./HomeSearchField";

describe("HomeSearchField", () => {
  const mockHandleSearch = vi.fn();
  const mockSetSearchTerm = vi.fn();
  let user: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    user = userEvent.setup();
  });
  it("should render input and submit button", () => {
    render(
      <HomeSearchField
        searchTerm={""}
        handleSearch={mockHandleSearch}
        setSearchTerm={mockSetSearchTerm}
      />,
    );

    const button = screen.getAllByRole("button");
    const input = screen.getByLabelText("What are you looking for?");

    expect(button).toHaveLength(2);
    expect(input).toBeInTheDocument();
  });

  it("should update input value on change", async () => {
    render(
      <HomeSearchField
        searchTerm={""}
        handleSearch={mockHandleSearch}
        setSearchTerm={mockSetSearchTerm}
      />,
    );

    const input = screen.getByLabelText("What are you looking for?");

    await user.type(input, "ar");

    expect(mockSetSearchTerm).toHaveBeenCalledTimes(2);
  });

  it("should call handleSearch on form submit", async () => {
    render(
      <HomeSearchField
        searchTerm={"ar"}
        handleSearch={mockHandleSearch}
        setSearchTerm={mockSetSearchTerm}
      />,
    );

    const button = screen.getByRole("button", { name: "Search" });

    await user.click(button);

    expect(mockHandleSearch).toHaveBeenCalled();
  });

  it("should have accessible label", () => {
    render(
      <HomeSearchField
        searchTerm={""}
        handleSearch={mockHandleSearch}
        setSearchTerm={mockSetSearchTerm}
      />,
    );

    const input = screen.getByRole("textbox", { name: /what are you looking for/i });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "user-search");
  });
});
