import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProcedureEditPage from "../ProcedureEditPage";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "proc-1" }),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockGetById = vi.fn();
const mockUpdate = vi.fn();
vi.mock("../../../../services/admin/procedures/procedures.service", () => ({
  adminProceduresApi: {
    getById: (...args: any[]) => mockGetById(...args),
    update: (...args: any[]) => mockUpdate(...args),
  },
}));

const mockProcedure = {
  id: "proc-1",
  name: "Syllabus Certification Protocol",
  description: "Validation workflow for university",
  requirementsText: "Academic documents required",
  isActive: true,
  facultyId: null,
  careerId: null,
  facultyName: null,
  careerName: null,
  requirements: [
    { id: "r-1", name: "Approved digital academic record", description: "Record", isMandatory: true },
  ],
};

describe("EDUPR-229: Procedure Edit Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetById.mockResolvedValue(mockProcedure);
    mockUpdate.mockResolvedValue({ data: { id: "proc-1" } });
  });

  it("should display a loading layout initially and then render the form", async () => {
    const { container } = render(<ProcedureEditPage />);

    const loader = container.querySelector(".animate-spin");
    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByDisplayValue("Syllabus Certification Protocol")).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue("Academic documents required")).toBeInTheDocument();
  });

  it("should show validation error when required fields are blanked", async () => {
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

    const saveButton = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByText("The procedure name is required.")).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled();
    });
  });
});
