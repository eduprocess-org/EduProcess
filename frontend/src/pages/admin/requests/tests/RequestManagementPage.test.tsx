import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import RequestManagementPage from "../RequestsManagementPage";

import { useAdminRequests } from "../../../../hooks/admin/useAdminRequests";

vi.mock("../../../../hooks/admin/useAdminRequests");

vi.mock(
  "../../../../components/admin-requests/RequestFilters",
  () => ({
    default: () => (
      <div data-testid="filters">
        Filters
      </div>
    ),
  })
);

vi.mock(
  "../../../../components/admin-requests/RequestTable",
  () => ({
    default: () => (
      <div data-testid="request-table">
        Table
      </div>
    ),
  })
);

const mockedHook =
  vi.mocked(useAdminRequests);

describe("RequestManagementPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page correctly", () => {
    mockedHook.mockReturnValue({
      requests: [],
      loading: false,
      error: null,
      total: 0,
      totalPages: 1,
      reload: vi.fn(),
    });

    render(
      <MemoryRouter>
        <RequestManagementPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        /request management/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("filters")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("request-table")
    ).toBeInTheDocument();
  });

  it("shows loading state", () => {
    mockedHook.mockReturnValue({
      requests: [],
      loading: true,
      error: null,
      total: 0,
      totalPages: 1,
      reload: vi.fn(),
    });

    render(
      <MemoryRouter>
        <RequestManagementPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        /loading requests/i
      )
    ).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockedHook.mockReturnValue({
      requests: [],
      loading: false,
      error: "Server error",
      total: 0,
      totalPages: 1,
      reload: vi.fn(),
    });

    render(
      <MemoryRouter>
        <RequestManagementPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        /server error/i
      )
    ).toBeInTheDocument();
  });

  it("shows total requests", () => {
    mockedHook.mockReturnValue({
      requests: [],
      loading: false,
      error: null,
      total: 15,
      totalPages: 2,
      reload: vi.fn(),
    });

    render(
      <MemoryRouter>
        <RequestManagementPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText("15")
    ).toBeInTheDocument();
  });
});