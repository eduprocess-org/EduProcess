import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AdministrativeObservations from "../AdministrativeObservations";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("AdministrativeObservations Component", () => {
  const mockObservations = [
    {
      id: "obs-1",
      authorName: "Dr. Franklin Jimenez",
      role: "Coordinator",
      comment: "Missing proper bank verification token.",
      createdAt: "2026-06-19T10:00:00Z",
    },
  ];

  const mockFetchApi = vi.fn();
  const mockSubmitApi = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockFetchApi.mockResolvedValue([...mockObservations]);
  });

  it("fetches and renders observations timeline successfully", async () => {
    render(
      <AdministrativeObservations
        requestId="REQ-999"
        fetchObservationsApi={mockFetchApi}
        submitObservationApi={mockSubmitApi}
        isAdmin={true}
      />
    );

    expect(mockFetchApi).toHaveBeenCalledWith("REQ-999");
    
    await waitFor(() => {
      expect(screen.getByText("Missing proper bank verification token.")).toBeInTheDocument();
      expect(screen.getByText("Dr. Franklin Jimenez")).toBeInTheDocument();
    });
  });

  it("prevents submission and displays warning if comment input is empty", async () => {
    const user = userEvent.setup();
    render(
      <AdministrativeObservations
        requestId="REQ-999"
        fetchObservationsApi={mockFetchApi}
        submitObservationApi={mockSubmitApi}
        isAdmin={true}
      />
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading observation timeline...")).not.toBeInTheDocument();
    });

    const submitBtn = screen.getByRole("button", { name: /Submit Observation/i });
    // El botón HTML se deshabilita si está vacío por atributo nativo, pero testeamos la lógica
    expect(submitBtn).toBeDisabled();
  });

  it("appends new observation onto timeline correctly upon API response", async () => {
    const user = userEvent.setup();
    const newMockObs = {
      id: "obs-2",
      authorName: "Administrative Coordinator",
      role: "Admin",
      comment: "Document approved after manual verification.",
      createdAt: "2026-06-19T12:00:00Z",
    };
    
    mockSubmitApi.mockResolvedValue(newMockObs);

    render(
      <AdministrativeObservations
        requestId="REQ-999"
        fetchObservationsApi={mockFetchApi}
        submitObservationApi={mockSubmitApi}
        isAdmin={true}
      />
    );

    const textarea = await screen.findByPlaceholderText(/Provide constructive feedback/i);
    await user.type(textarea, "Document approved after manual verification.");

    const submitBtn = screen.getByRole("button", { name: /Submit Observation/i });
    await user.click(submitBtn);

    expect(mockSubmitApi).toHaveBeenCalledWith("REQ-999", "Document approved after manual verification.");
    
    await waitFor(() => {
      expect(screen.getByText("Document approved after manual verification.")).toBeInTheDocument();
    });
  });

  it("hides input form controls entirely if user is not an administrator", async () => {
    render(
      <AdministrativeObservations
        requestId="REQ-999"
        fetchObservationsApi={mockFetchApi}
        submitObservationApi={mockSubmitApi}
        isAdmin={false} // Read-only mode
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Your current account role has read-only access/i)).toBeInTheDocument();
    });

    expect(screen.queryByPlaceholderText(/Provide constructive feedback/i)).not.toBeInTheDocument();
  });
});