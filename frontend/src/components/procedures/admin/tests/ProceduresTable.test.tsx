import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProceduresTable from "../ProceduresTable";

const mockData = [
  {
    id: "1",
    code: "PROC-001",
    name: "Academic Certificate",
    description: "Test description",
    status: "ACTIVE",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-02",
  },
];

describe("ProceduresTable", () => {
  it("should render procedure name", () => {
    render(<ProceduresTable procedures={mockData as any} />);

    expect(screen.getByText("Academic Certificate")).toBeInTheDocument();
  });

  it("should render code", () => {
    render(<ProceduresTable procedures={mockData as any} />);

    expect(screen.getByText("PROC-001")).toBeInTheDocument();
  });
});