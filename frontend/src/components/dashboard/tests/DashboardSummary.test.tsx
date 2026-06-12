import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import DashboardSummary from "../DashboardSummary";

describe("DashboardSummary", () => {
  it("shows correct statistics", () => {
    render(
      <DashboardSummary
        requests={[
          {
            id: "1",
            procedureName: "Certificate",
            status: "PENDING",
            createdAt: "2026-06-10",
          },
          {
            id: "2",
            procedureName: "Enrollment",
            status: "APPROVED",
            createdAt: "2026-06-09",
          },
          {
            id: "3",
            procedureName: "Tuition",
            status: "REJECTED",
            createdAt: "2026-06-08",
          },
        ]}
      />
    );

    expect(
      screen.getByText("Total Requests")
    ).toBeInTheDocument();

    expect(
      screen.getByText("3")
    ).toBeInTheDocument();
  });
});