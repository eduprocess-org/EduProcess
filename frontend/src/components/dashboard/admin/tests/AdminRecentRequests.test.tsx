import { render, screen } from "@testing-library/react";
import AdminRecentRequests from "../AdminRecentRequests";
import type { RecentRequest } from "../../../../types/admin/adminDashboard.types";

const requests: RecentRequest[] = [
  {
    id: "1",
    studentName: "Juan Perez",
    procedureName: "Transcript Request",
    status: "PENDING",
    createdAt: "2026-06-16",
  },
  {
    id: "2",
    studentName: "Maria Lopez",
    procedureName: "Enrollment Certificate",
    status: "APPROVED",
    createdAt: "2026-06-15",
  },
];

describe("AdminRecentRequests", () => {
  it("renders recent requests", () => {
    render(
      <AdminRecentRequests
        requests={requests}
      />
    );

    expect(
      screen.getByText("Juan Perez")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Maria Lopez")
    ).toBeInTheDocument();

    // Verificaciones de tipos de trámites
    expect(
      screen.getByText("Transcript Request")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Enrollment Certificate")
    ).toBeInTheDocument();

  });
});