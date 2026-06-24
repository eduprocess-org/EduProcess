import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ObservationsPanel from "../ObservationsPanel";
import * as hooks from "../../../hooks/admin/useObservations";

vi.mock("../../../hooks/admin/useObservations");
vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

describe("ObservationsPanel - TanStack Query Integration", () => {
  const mockObservations = [
    {
      id: "obs-abc",
      requestId: "REQ-777",
      adminId: "adm-1",
      comment: "Documentos incompletos en el cobro.",
      createdAt: "2026-06-18T18:00:00.000Z",
      adminName: "Admin Garcia",
    },
  ];

  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Estado por defecto de carga exitosa
    vi.spyOn(hooks, "useObservations").mockReturnValue({
      data: mockObservations,
      isLoading: false,
      refetch: vi.fn(),
    } as any);

    vi.spyOn(hooks, "useCreateObservation").mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as any);

    vi.spyOn(hooks, "useDeleteObservation").mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);
  });

  it("renders chronological observations correctly", () => {
    render(<ObservationsPanel requestId="REQ-777" />);
    expect(screen.getByText("Documentos incompletos en el cobro.")).toBeInTheDocument();
    expect(screen.getByText(/Admin Garcia/)).toBeInTheDocument();
  });

  it("blocks submission if text input rules are violated (empty trim)", async () => {
    render(<ObservationsPanel requestId="REQ-777" />);
    const button = screen.getByRole("button", { name: /Agregar Observación/i });
    expect(button).toBeDisabled();
  });

  it("calls mutate function on valid form submit", async () => {
    const user = userEvent.setup();
    render(<ObservationsPanel requestId="REQ-777" />);
    
    const textarea = screen.getByPlaceholderText(/Escribir observación técnica/i);
    await user.type(textarea, "Nueva revisión aprobada");

    const button = screen.getByRole("button", { name: /Agregar Observación/i });
    await user.click(button);

    expect(mockMutate).toHaveBeenCalledWith("Nueva revisión aprobada", expect.any(Object));
  });
});