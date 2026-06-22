import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import DashboardError from "../DashboardError";

describe("DashboardError", () => {
  it("shows error message", () => {
    render(
      <DashboardError
        message="Failed to load requests"
      />
    );

    expect(
      screen.getByText(
        "Failed to load requests"
      )
    ).toBeInTheDocument();
  });
});