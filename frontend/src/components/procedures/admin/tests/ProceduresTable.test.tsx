import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest"; 
import ProceduresTable from "../ProceduresTable";

const mockData = [
  {
    id: "1",
    code: "PROC-001",
    name: "Academic Certificate",
    description: "Test description",
    status: "ACTIVE", 
    updatedAt: "2026-01-02",
  },
];

describe("ProceduresTable", () => {
  const mockRefresh = vi.fn(); 

  it("should render procedure name", () => {
    render(
      <BrowserRouter>
        <ProceduresTable procedures={mockData as any} onRefreshList={mockRefresh} />
      </BrowserRouter>
    );

    expect(screen.getByText("Academic Certificate")).toBeInTheDocument();
  });

  it("should render code", () => {
    render(
      <BrowserRouter>
        {/* Pasamos onRefreshList como propiedad */}
        <ProceduresTable procedures={mockData as any} onRefreshList={mockRefresh} />
      </BrowserRouter>
    );

    expect(screen.getByText("PROC-001")).toBeInTheDocument();
  });
});