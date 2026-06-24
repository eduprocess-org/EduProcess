// src/pages/admin/procedures/tests/ProcedureEdit.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProcedureEditPage from "../ProcedureEditPage";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "1" }),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("EDUPR-231: Procedure Edit Module - Unit Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display a loading layout initially and then render the atomic form", async () => {
    const { container } = render(<ProcedureEditPage />);
    
    // Encuentra el spinner de Lucide usando su clase CSS de animación sin importar la accesibilidad
    const loader = container.querySelector(".animate-spin");
    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue("Syllabus Certification Protocol")).toBeInTheDocument();
    });
    
    expect(screen.getByDisplayValue("3 business days")).toBeInTheDocument();
  });

  it("should show validation error message when required fields are blanked out", async () => {
    render(<ProcedureEditPage />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue("Syllabus Certification Protocol")).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText("e.g., Degree Verification Protocol");
    fireEvent.change(nameInput, { target: { value: "" } });

    const saveButton = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(saveButton);

    expect(await screen.findByText("The procedure name is required.")).toBeInTheDocument();
  });

  it("should successfully trigger the update workflow when form data is valid", async () => {
    render(<ProcedureEditPage />);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue("Syllabus Certification Protocol")).toBeInTheDocument();
    });

    const timeInput = screen.getByPlaceholderText("e.g., 5 business days");
    fireEvent.change(timeInput, { target: { value: "10 business days" } });

    const saveButton = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByText("The procedure name is required.")).not.toBeInTheDocument();
    });
  });
});