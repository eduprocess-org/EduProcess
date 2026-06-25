import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProceduresTable from "../ProceduresTable";

const mockDelete = vi.fn();

vi.mock("../../../../services/admin/procedures/procedures.service", () => ({
  adminProceduresApi: {
    delete: (...args: any[]) => mockDelete(...args),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockProcedures = [
  {
    id: "uuid-101",
    name: "Syllabus Certification Protocol",
    description: "Validation matrix",
    requirementsText: "Docs",
    isActive: true,
    facultyId: null,
    careerId: null,
    facultyName: null,
    careerName: null,
    requirementsCount: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-02T00:00:00.000Z",
  },
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
    mockDelete.mockResolvedValue(undefined);

    render(
      <BrowserRouter>
        <ProceduresTable procedures={mockProcedures} onRefreshList={mockRefreshList} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId("delete-btn-uuid-101"));
    fireEvent.click(screen.getByRole("button", { name: /confirm deletion/i }));

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith("uuid-101");
      expect(mockRefreshList).toHaveBeenCalledTimes(1);
    });
  });
});
