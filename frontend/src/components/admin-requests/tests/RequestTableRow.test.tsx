import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import RequestTableRow from "../RequestTableRow";
import type { AdminRequestListItem } from "../../../types/admin/adminRequest.types";

const mockRequest: AdminRequestListItem = {
  id: "REQ-001",
  studentName: "Vanessa Heredia",
  studentEmail: "vanessa@test.com",
  procedureName: "Academic Certificate",
  status: "pending",
  career: "Sistemas",
  semester: "7",
  createdAt: "2026-06-15T10:00:00Z",
  updatedAt: "2026-06-15T10:00:00Z",
};

describe("RequestTableRow", () => {
  it("renders request information", () => {
    render(
      <table>
        <tbody>
          <RequestTableRow
            request={mockRequest}
            isEven={true}
            selected={false}
            onSelect={vi.fn()}
            onView={vi.fn()} 
          />
        </tbody>
      </table>
    );

    expect(screen.getByText("REQ-001")).toBeInTheDocument();
    expect(screen.getByText("Vanessa Heredia")).toBeInTheDocument();
    expect(screen.getByText("Academic Certificate")).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });

  it("calls onSelect when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const onSelectMock = vi.fn();

    render(
      <table>
        <tbody>
          <RequestTableRow
            request={mockRequest}
            isEven={true}
            selected={false}
            onSelect={onSelectMock}
            onView={vi.fn()}
          />
        </tbody>
      </table>
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(onSelectMock).toHaveBeenCalledWith("REQ-001");
  });

  it("calls onView when the view button is clicked", async () => {
    const user = userEvent.setup();
    const onViewMock = vi.fn();

    render(
      <table>
        <tbody>
          <RequestTableRow
            request={mockRequest}
            isEven={true}
            selected={false}
            onSelect={vi.fn()}
            onView={onViewMock} 
          />
        </tbody>
      </table>
    );

    const viewButton = screen.getByRole("button", { name: /view/i });
    await user.click(viewButton);

    expect(onViewMock).toHaveBeenCalledTimes(1);
  });
});