// src/pages/admin/procedures/tests/ProcedureCreation.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProcedureCreationPage from "../ProcedureCreationPage";

// 1. Mock de navegación de React Router
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// 2. Mock de notificaciones globales
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// 3. Proveedor limpio de React Query para aislar estados
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

describe("EDUPR-23: Procedure Creation Module - Unit Tests", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  it("should block submission and display validation messages when fields are empty", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProcedureCreationPage />
      </QueryClientProvider>
    );

    // Intentar disparar el envío del formulario vacío
    const submitButton = screen.getByRole("button", { name: /deploy procedure/i });
    fireEvent.click(submitButton);

    // Actividad: Validar despliegue de mensajes de error de validación
    expect(await screen.findByText("The procedure name is required.")).toBeInTheDocument();
    expect(screen.getByText("The description is required.")).toBeInTheDocument();
    expect(screen.getByText("Estimated processing time is required.")).toBeInTheDocument();
  });

  it("should allow dynamic addition of multiple requirements cleanly", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProcedureCreationPage />
      </QueryClientProvider>
    );

    const addRequirementButton = screen.getByRole("button", { name: /add requirement/i });
    
    // Verificar estado estructural base del arreglo
    expect(screen.getByPlaceholderText("Requirement #1")).toBeInTheDocument();

    // Simular inyección dinámica de un nuevo nodo
    fireEvent.click(addRequirementButton);
    expect(screen.getByPlaceholderText("Requirement #2")).toBeInTheDocument();
  });

  it("should submit form data successfully when validation constraints are fully satisfied", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProcedureCreationPage />
      </QueryClientProvider>
    );

    // Corregido: Mapeo exacto mediante Placeholders para evitar la desconexión semántica con el Label
    fireEvent.change(screen.getByPlaceholderText("e.g., Degree Verification Protocol"), {
      target: { value: "Syllabus Certification Protocol" },
    });
    fireEvent.change(screen.getByPlaceholderText("Summarize the core purpose of this procedure..."), {
      target: { value: "Validation workflow for internal university academic layout." },
    });
    fireEvent.change(screen.getByPlaceholderText("Requirement #1"), {
      target: { value: "Approved digital academic record" },
    });
    fireEvent.change(screen.getByPlaceholderText("e.g., 5 business days"), {
      target: { value: "3 business days" },
    });

    // Lanzar flujo de persistencia válido hacia el API mockeado
    const submitButton = screen.getByRole("button", { name: /deploy procedure/i });
    fireEvent.click(submitButton);

    // Esperar a que el hilo descarte los errores previos al pasar la validación
    await waitFor(() => {
      expect(screen.queryByText("The procedure name is required.")).not.toBeInTheDocument();
    });
  });
});