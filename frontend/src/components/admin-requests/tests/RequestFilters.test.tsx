import {
  describe,
  it,
  expect,
  vi,
} from "vitest";

import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import RequestFilters from "../RequestFilters";

describe("RequestFilters", () => {
  it("renders filters", () => {
    render(
      <RequestFilters
        search=""
        status=""
        procedure=""
        onSearchChange={vi.fn()}
        onStatusChange={vi.fn()}
        onProcedureChange={vi.fn()}
      />
    );

    expect(
      screen.getByPlaceholderText(/search/i)
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("")
    ).toBeInTheDocument();
  });

  it("updates search", async () => {
    const user = userEvent.setup();

    const onSearch = vi.fn();

    render(
      <RequestFilters
        search=""
        status=""
        procedure=""
        onSearchChange={onSearch}
        onStatusChange={vi.fn()}
        onProcedureChange={vi.fn()}
      />
    );

    await user.type(
      screen.getByPlaceholderText(/search/i),
      "certificate"
    );

    expect(onSearch).toHaveBeenCalled();
  });

  it("changes status", async () => {
    const user = userEvent.setup();

    const onStatus = vi.fn();

    render(
      <RequestFilters
        search=""
        status=""
        procedure=""
        onSearchChange={vi.fn()}
        onStatusChange={onStatus}
        onProcedureChange={vi.fn()}
      />
    );

    await user.selectOptions(
      screen.getAllByRole("combobox")[0],
      "PENDING"
    );

    expect(onStatus)
      .toHaveBeenCalledWith("PENDING");
  });
});