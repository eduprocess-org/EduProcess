import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EmptyState from "../EmptyState";

describe("EmptyState", () => {
  it("should render empty message", () => {
    render(<EmptyState />);

    expect(screen.getByText("No procedures found")).toBeInTheDocument();
  });
});