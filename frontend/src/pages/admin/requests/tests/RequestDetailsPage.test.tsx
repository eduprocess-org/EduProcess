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

<<<<<<< HEAD
// Mock de sonner para evitar errores de renderizado en el entorno de pruebas
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

=======
>>>>>>> d2c027a9d805c3b4a002f248d9feb8b4754c588c
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
    
<<<<<<< HEAD
    // Cambiado para hacer match con el mock en inglés de la UI
    expect(screen.getByText("Fee_Payment_Receipt.pdf")).toBeInTheDocument();
  });

  it("executes approval workflow updates successfully after confirmation modal", async () => {
=======
    expect(screen.getByText("Comprobante_Pago_Aranceles.pdf")).toBeInTheDocument();
  });

  it("executes approval workflow updates successfully", async () => {
>>>>>>> d2c027a9d805c3b4a002f248d9feb8b4754c588c
    const user = userEvent.setup();
    renderComponent("REQ-888");

    await waitFor(() => {
      expect(screen.queryByText(/loading request details…/i)).not.toBeInTheDocument();
    });

<<<<<<< HEAD
    // 1. Clic en el botón principal de aprobación
    const approveButton = screen.getByRole("button", { name: /approve request/i });
    await user.click(approveButton);

    // 2. Verificar que el modal de confirmación se abrió
    expect(screen.getByText("Confirm Status Transition")).toBeInTheDocument();

    // 3. Confirmar la acción haciendo clic en el botón del modal
    const confirmButton = screen.getByRole("button", { name: /yes, confirm update/i });
    await user.click(confirmButton);

    // 4. Esperar a que la UI actualice el estado a APPROVED
    await waitFor(() => {
      const approvedElements = screen.getAllByText(/APPROVED/i);
      expect(approvedElements.length).toBeGreaterThan(0);
    });

    // 5. Los botones de acción deben desaparecer al ser estado terminal
=======
    const approveButton = screen.getByRole("button", { name: /approve request/i });
    await user.click(approveButton);

    await waitFor(() => {
    const approvedElements = screen.getAllByText(/APPROVED/i);
    expect(approvedElements.length).toBeGreaterThan(0);
    });

>>>>>>> d2c027a9d805c3b4a002f248d9feb8b4754c588c
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