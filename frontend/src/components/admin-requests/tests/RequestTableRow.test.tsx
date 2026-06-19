import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RequestTableRow from "../RequestTableRow";
import type {
  AdminRequest,
} from "../../../services/admin/requests/requestManagement.service";

const request: AdminRequest = {
  id: "REQ-001",
  studentName: "Vanessa Heredia",
  studentEmail: "vanessa@test.com",
  procedureName: "Academic Certificate",
  status: "PENDING",
  submittedAt: "2026-06-15T10:00:00Z",
};

describe("RequestTableRow", () => {
  it("renders request information", () => {
    render(
      <table>
        <tbody>
          <RequestTableRow
            request={request}
            isEven
            selected={false}
            onSelect={vi.fn()}
          />
        </tbody>
      </table>
    );

    expect(
      screen.getByText("REQ-001")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Vanessa Heredia")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Academic Certificate")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/pending/i)
    ).toBeInTheDocument();
  });

  it("calls onSelect", async () => {
    const user = userEvent.setup();

    const onSelect = vi.fn();

    render(
      <table>
        <tbody>
          <RequestTableRow
            request={request}
            isEven
            selected={false}
            onSelect={onSelect}
          />
        </tbody>
      </table>
    );

    await user.click(
      screen.getByRole("checkbox")
    );

    expect(onSelect)
      .toHaveBeenCalledWith("REQ-001");
  });
});