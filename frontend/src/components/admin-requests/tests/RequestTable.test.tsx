import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import RequestTable from "../RequestTable";

import type { AdminRequest } from "../../../services/admin/requests/requestManagement.service";

const requests: AdminRequest[] = [
  {
    id: "REQ-001",
    studentName: "Vanessa Heredia",
    studentEmail: "vanessa@test.com",
    procedureName: "Academic Certificate",
    status: "PENDING",
    submittedAt: "2026-06-15T10:00:00Z",
  },
];

describe("RequestTable", () => {
  it("renders rows", () => {
    render(
      <RequestTable
        requests={requests}
        sortBy="submittedAt"
        order="desc"
        onSort={vi.fn()}
        selectedRequests={[]}
        onToggleSelect={vi.fn()}
        onToggleSelectAll={vi.fn()}
      />
    );

    expect(
      screen.getByText("REQ-001")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Vanessa Heredia"
      )
    ).toBeInTheDocument();
  });

  it("shows empty state", () => {
    render(
      <RequestTable
        requests={[]}
        sortBy="submittedAt"
        order="desc"
        onSort={vi.fn()}
        selectedRequests={[]}
        onToggleSelect={vi.fn()}
        onToggleSelectAll={vi.fn()}
      />
    );

    expect(
      screen.getByText(
        /no requests found/i
      )
    ).toBeInTheDocument();
  });
});