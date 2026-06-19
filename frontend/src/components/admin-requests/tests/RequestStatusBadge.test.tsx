import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import RequestStatusBadge from "../RequestStatusBadge";

describe("RequestStatusBadge", () => {
  it("renders pending", () => {
    render(
      <RequestStatusBadge
        status="PENDING"
      />
    );

    expect(
      screen.getByText(/pending/i)
    ).toBeInTheDocument();
  });

  it("renders approved", () => {
    render(
      <RequestStatusBadge
        status="APPROVED"
      />
    );

    expect(
      screen.getByText(/approved/i)
    ).toBeInTheDocument();
  });

  it("renders rejected", () => {
    render(
      <RequestStatusBadge
        status="REJECTED"
      />
    );

    expect(
      screen.getByText(/rejected/i)
    ).toBeInTheDocument();
  });
});