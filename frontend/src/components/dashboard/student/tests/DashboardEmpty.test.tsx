import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import DashboardEmpty from "../DashboardEmpty";

describe("DashboardEmpty", () => {
  it("shows empty state", () => {
    render(
      <MemoryRouter>
        <DashboardEmpty />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/No Requests Found/i)
    ).toBeInTheDocument();
  });
});