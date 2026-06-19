import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import RequestDetailsPage from "../RequestDetailsPage";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("RequestDetailsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (requestId = "REQ-123") => {
    return render(
      <MemoryRouter initialEntries={[`/admin/requests/${requestId}`]}>
        <Routes>
          <Route path="/admin/requests/:id" element={<RequestDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("shows loading state initially", () => {
    renderComponent();
    expect(screen.getByText(/loading request details…/i)).toBeInTheDocument();
  });

  it("renders student and procedure details after loading", async () => {
    renderComponent("REQ-777");

    await waitFor(() => {
      expect(screen.queryByText(/loading request details…/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText("REQ-777")).toBeInTheDocument();
    expect(screen.getByText("Enrollment Certificate")).toBeInTheDocument();
    expect(screen.getByText("Carlos Andrés Vera")).toBeInTheDocument();
    expect(screen.getByText("carlos.vera@uce.edu.ec")).toBeInTheDocument();
    
    expect(screen.getByText("Comprobante_Pago_Aranceles.pdf")).toBeInTheDocument();
  });

  it("executes approval workflow updates successfully", async () => {
    const user = userEvent.setup();
    renderComponent("REQ-888");

    await waitFor(() => {
      expect(screen.queryByText(/loading request details…/i)).not.toBeInTheDocument();
    });

    const approveButton = screen.getByRole("button", { name: /approve request/i });
    await user.click(approveButton);

    await waitFor(() => {
    const approvedElements = screen.getAllByText(/APPROVED/i);
    expect(approvedElements.length).toBeGreaterThan(0);
    });

    expect(screen.queryByRole("button", { name: /approve request/i })).not.toBeInTheDocument();
  });

  it("navigates back to management when back button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByText(/loading request details…/i)).not.toBeInTheDocument();
    });

    const backButton = screen.getByRole("button", { name: /back to management/i });
    await user.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/admin/requests");
  });
});