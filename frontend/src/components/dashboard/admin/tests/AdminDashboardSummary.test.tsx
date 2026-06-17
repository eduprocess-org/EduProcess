import { render, screen } from "@testing-library/react";
import AdminDashboardSummary from "../AdminDashboardSummary";

describe("AdminDashboardSummary", () => {
  it("renders statistics correctly", () => {
    render(
      <AdminDashboardSummary
        total={120}
        pending={18}
        approved={85}
        rejected={17}
      />
    );

    expect(
    screen.getByText("Total requests")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Pending")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Approved")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Rejected")
    ).toBeInTheDocument();

    expect(
      screen.getByText("120")
    ).toBeInTheDocument();

    expect(
      screen.getByText("18")
    ).toBeInTheDocument();

    expect(
      screen.getByText("85")
    ).toBeInTheDocument();

    expect(
      screen.getByText("17")
    ).toBeInTheDocument();
  });
});