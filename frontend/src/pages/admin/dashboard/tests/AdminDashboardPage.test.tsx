import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import AdminDashboardPage from "../AdminDashboardPage";

vi.mock(
  "../../../../hooks/admin/useAdminDashboard",
  () => ({
    useAdminDashboard: () => ({
      loading: false,
      error: null,
      stats: {
        totalRequests: 120,
        pendingRequests: 18,
        approvedRequests: 85,
        rejectedRequests: 17,
      },
      requests: [],
    }),
  })
);

describe("AdminDashboardPage", () => {
  it("renders dashboard title", () => {
    render(
      <MemoryRouter>
        <AdminDashboardPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        "Administrator Dashboard"
      )
    ).toBeInTheDocument();
  });
});