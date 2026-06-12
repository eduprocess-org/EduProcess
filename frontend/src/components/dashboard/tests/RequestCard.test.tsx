import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import RequestCard from "../RequestCard";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual(
      "react-router-dom"
    );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("RequestCard", () => {
  it("renders request info", () => {
    render(
      <MemoryRouter>
        <RequestCard
          request={{
            id: "REQ-001",
            procedureName:
              "Academic Certificate",
            status: "PENDING",
            createdAt: "2026-06-10",
          }}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        "Academic Certificate"
      )
    ).toBeInTheDocument();

    expect(
    screen.getByText(/pending/i)
    ).toBeInTheDocument();
  });
});