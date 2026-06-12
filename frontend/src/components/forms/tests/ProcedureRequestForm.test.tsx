import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import ProcedureRequestForm from "../ProcedureRequestForm";

import { createProcedureRequest } from "../../../services/procedures/procedureRequest.service";

vi.mock(
  "../../../services/procedures/procedureRequest.service",
  () => ({
    createProcedureRequest: vi.fn(),
  })
);

vi.mock("../../../hooks/useAuth", () => ({
  useAuth: () => ({
    user: {
      firstName: "Vanessa",
      lastName: "Heredia",
      email: "vanessa@test.com",
    },
  }),
}));

const mockProcedure = {
  id: "1",
  name: "Academic Certificate",
  description:
    "Request an official academic certificate",
};

describe("ProcedureRequestForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form correctly", () => {
    render(
      <MemoryRouter>
        <ProcedureRequestForm
          procedure={mockProcedure}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        "Academic Certificate"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/career/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/semester/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/reason/i)
    ).toBeInTheDocument();
  });

  it("shows validation errors", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ProcedureRequestForm
          procedure={mockProcedure}
        />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: /submit request/i,
      })
    );

    expect(
      await screen.findByText(
        /career is required/i
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        /semester is required/i
      )
    ).toBeInTheDocument();
  });

  it("submits successfully", async () => {
    const user = userEvent.setup();

    vi.mocked(
      createProcedureRequest
    ).mockResolvedValue({
      requestId: "REQ-123",
      status: "PENDING",
    });

    render(
      <MemoryRouter>
        <ProcedureRequestForm
          procedure={mockProcedure}
        />
      </MemoryRouter>
    );

    await user.selectOptions(
      screen.getByLabelText(/career/i),
      "Information Systems"
    );

    await user.selectOptions(
      screen.getByLabelText(/semester/i),
      "5"
    );

    await user.type(
      screen.getByLabelText(/reason/i),
      "Need certificate for internship."
    );

    await user.click(
      screen.getByRole("button", {
        name: /submit request/i,
      })
    );

    await waitFor(() => {
      expect(
        createProcedureRequest
      ).toHaveBeenCalled();
    });
  });

  it("shows API error", async () => {
    const user = userEvent.setup();

    vi.mocked(
      createProcedureRequest
    ).mockRejectedValue(
      new Error("Server error")
    );

    render(
      <MemoryRouter>
        <ProcedureRequestForm
          procedure={mockProcedure}
        />
      </MemoryRouter>
    );

    await user.selectOptions(
      screen.getByLabelText(/career/i),
      "Information Systems"
    );

    await user.selectOptions(
      screen.getByLabelText(/semester/i),
      "5"
    );

    await user.type(
      screen.getByLabelText(/reason/i),
      "Need certificate for internship."
    );

    await user.click(
      screen.getByRole("button", {
        name: /submit request/i,
      })
    );

    expect(
      await screen.findByText(
        /server error/i
      )
    ).toBeInTheDocument();
  });

  it("prevents duplicate submission", async () => {
    const user = userEvent.setup();

    vi.mocked(
      createProcedureRequest
    ).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                requestId:
                  "REQ-123",
                status:
                  "PENDING",
              }),
            1000
          )
        )
    );

    render(
      <MemoryRouter>
        <ProcedureRequestForm
          procedure={mockProcedure}
        />
      </MemoryRouter>
    );

    await user.selectOptions(
      screen.getByLabelText(/career/i),
      "Information Systems"
    );

    await user.selectOptions(
      screen.getByLabelText(/semester/i),
      "5"
    );

    await user.type(
      screen.getByLabelText(/reason/i),
      "Need certificate for internship."
    );

    const submitButton =
      screen.getByRole("button", {
        name: /submit request/i,
      });

    await user.click(submitButton);

    expect(
      submitButton
    ).toBeDisabled();
  });
});