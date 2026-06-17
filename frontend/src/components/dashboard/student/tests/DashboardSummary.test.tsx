import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import DashboardSummary from "../DashboardSummary";

describe("DashboardSummary", () => {
  it("shows correct statistics", () => {
    const requests = [
      {
        id: "REQ-001",
        procedureId: "PROC-001",
        procedureName: "Certificate",
        status: "PENDING" as const,
        createdAt: "2026-06-10",
      },
      {
        id: "REQ-002",
        procedureId: "PROC-002",
        procedureName: "Enrollment",
        status: "APPROVED" as const,
        createdAt: "2026-06-09",
      },
      {
        id: "REQ-003",
        procedureId: "PROC-003",
        procedureName: "Tuition",
        status: "REJECTED" as const,
        createdAt: "2026-06-08",
      },
    ];

    render(<DashboardSummary requests={requests} />);

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("Rejected")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});