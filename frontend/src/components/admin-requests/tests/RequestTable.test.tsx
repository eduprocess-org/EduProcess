import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import RequestTable from "../RequestTable";
import type { AdminRequestListItem } from "../../../types/admin/adminRequest.types"; 

const mockRequests: AdminRequestListItem[] = [
  {
    id: "REQ-001",
    studentName: "Vanessa Heredia",
    studentEmail: "vanessa.heredia@uce.edu.ec",
    procedureName: "Certificado de Matrícula",
    status: "pending",
    career: "Sistemas",      
    semester: "7",           
    createdAt: "2026-06-19T02:00:00.000Z", 
    updatedAt: "2026-06-19T02:00:00.000Z"
  },
];

describe("RequestTable", () => {
  it("renders rows and displays student data properly", () => {
    render(
      <RequestTable
        requests={mockRequests}
        sortBy="createdAt"
        order="desc"
        onSort={vi.fn()}
        selectedRequests={[]}
        onToggleSelect={vi.fn()}
        onToggleSelectAll={vi.fn()}
        onViewRequest={vi.fn()}
      />
    );

    expect(screen.getByText("REQ-001")).toBeInTheDocument();

    expect(screen.getByText("Vanessa Heredia")).toBeInTheDocument();

    expect(screen.getByText("vanessa.heredia@uce.edu.ec")).toBeInTheDocument();
  });

  it("shows empty state when there are no requests", () => {
    render(
      <RequestTable
        requests={[]}
        sortBy="createdAt"
        order="desc"
        onSort={vi.fn()}
        selectedRequests={[]}
        onToggleSelect={vi.fn()}
        onToggleSelectAll={vi.fn()}
        onViewRequest={vi.fn()}
      />
    );

    expect(
      screen.getByText(/no requests found/i)
    ).toBeInTheDocument();
  });
});