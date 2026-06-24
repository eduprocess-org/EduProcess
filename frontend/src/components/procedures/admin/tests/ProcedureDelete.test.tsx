import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProceduresTable from "../ProceduresTable";
import type { ProcedureStatus } from "../../../../types/admin/procedures/procedures.types";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));


const mockProcedures = [
  {
    id: "uuid-101",
    code: "PROC-001",
    name: "Syllabus Certification Protocol",
    description: "Validation matrix",
    status: "ACTIVE" as ProcedureStatus, // 👈 CASTING: Con esto resuelves el error de tipo
    createdAt: "2026-01-01",
    updatedAt: "2026-01-02"
  }
];

describe("EDUPR-232: Procedure Deletion Suite", () => {
  const mockRefreshList = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should deploy the confirmation dialog layout upon clicking the deletion controls", () => {
    render(
      <BrowserRouter>
        <ProceduresTable procedures={mockProcedures} onRefreshList={mockRefreshList} />
      </BrowserRouter>
    );

    const deleteButton = screen.getByTestId("delete-btn-uuid-101");
    fireEvent.click(deleteButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/"Syllabus Certification Protocol"/)).toBeInTheDocument();
  });

  it("should successfully execute backend pipeline workflow and trigger automatic list refresh", async () => {
    render(
      <BrowserRouter>
        <ProceduresTable procedures={mockProcedures} onRefreshList={mockRefreshList} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId("delete-btn-uuid-101"));
    fireEvent.click(screen.getByRole("button", { name: /confirm deletion/i }));

    await waitFor(() => {
      expect(mockRefreshList).toHaveBeenCalledTimes(1);
    });
  });
});