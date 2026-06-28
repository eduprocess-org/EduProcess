import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
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

const mockData = [
  {
    id: "1",
    name: "Academic Certificate",
    description: "Official certificate issued by the university.",
    requirementsText: "Bring ID",
    isActive: true,
    facultyId: null,
    careerId: null,
    facultyName: null,
    careerName: null,
    requirementsCount: 2,
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-10T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Enrollment Certificate",
    description: "Certificate proving current enrollment.",
    requirementsText: "",
    isActive: false,
    facultyId: null,
    careerId: null,
    facultyName: null,
    careerName: null,
    requirementsCount: 0,
    createdAt: "2026-06-02T00:00:00.000Z",
    updatedAt: "2026-06-09T00:00:00.000Z",
  },
];

describe("ProceduresTable", () => {
  const mockRefresh = vi.fn();

  it("should render procedure names", () => {
    render(
      <BrowserRouter>
        <ProceduresTable procedures={mockData as any} onRefreshList={mockRefresh} />
      </BrowserRouter>
    );

    expect(screen.getByText("Academic Certificate")).toBeInTheDocument();
    expect(screen.getByText("Enrollment Certificate")).toBeInTheDocument();
  });

  it("should render status badges", () => {
    render(
      <BrowserRouter>
        <ProceduresTable procedures={mockData as any} onRefreshList={mockRefresh} />
      </BrowserRouter>
    );

    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("should render requirements count", () => {
    render(
      <BrowserRouter>
        <ProceduresTable procedures={mockData as any} onRefreshList={mockRefresh} />
      </BrowserRouter>
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should trigger delete workflow when delete button is clicked", () => {
    render(
      <BrowserRouter>
        <ProceduresTable procedures={mockData as any} onRefreshList={mockRefresh} />
      </BrowserRouter>
    );

    const deleteBtn = screen.getByTestId("delete-btn-1");
    expect(deleteBtn).toBeInTheDocument();

    fireEvent.click(deleteBtn);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should call delete API on confirm", async () => {
    mockDelete.mockResolvedValue(undefined);

    render(
      <BrowserRouter>
        <ProceduresTable procedures={mockData as any} onRefreshList={mockRefresh} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByTestId("delete-btn-1"));
    fireEvent.click(screen.getByRole("button", { name: /confirm deletion/i }));

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith("1");
      expect(mockRefresh).toHaveBeenCalled();
    });
  });
});