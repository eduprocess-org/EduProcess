import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useProcedureEdit } from "./useProcedureEdit";

const mockNavigate = vi.fn();
const mockGetById = vi.fn();
const mockUpdate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "proc-1" }),
}));

vi.mock("../../../services/admin/procedures/procedures.service", () => ({
  adminProceduresApi: {
    getById: (...args: any[]) => mockGetById(...args),
    update: (...args: any[]) => mockUpdate(...args),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockProcedure = {
  id: "proc-1",
  name: "Transcript Request",
  description: "Official transcript",
  requirementsText: "Bring ID",
  isActive: true,
  facultyId: null,
  careerId: null,
  facultyName: null,
  careerName: null,
  requirements: [
    { id: "r-1", name: "Valid ID", description: "Government ID", isMandatory: true },
  ],
};

describe("useProcedureEdit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should load procedure data on mount", async () => {
    mockGetById.mockResolvedValue(mockProcedure);

    const { result } = renderHook(() => useProcedureEdit());

    expect(result.current.isLoadingData).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoadingData).toBe(false);
    });

    expect(result.current.name).toBe("Transcript Request");
    expect(result.current.description).toBe("Official transcript");
    expect(result.current.requirementsText).toBe("Bring ID");
    expect(result.current.isActive).toBe(true);
    expect(result.current.requirements).toEqual(["Valid ID"]);
  });

  it("should navigate back on load error", async () => {
    mockGetById.mockRejectedValue({
      response: { data: { message: "Not found" } },
    });

    renderHook(() => useProcedureEdit());

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/admin/procedures");
    });
  });

  it("should show validation errors when submitting with empty name", async () => {
    mockGetById.mockResolvedValue(mockProcedure);

    const { result } = renderHook(() => useProcedureEdit());

    await waitFor(() => {
      expect(result.current.isLoadingData).toBe(false);
    });

    act(() => {
      result.current.setName("");
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.errors.name).toBe("The procedure name is required.");
  });

  it("should call update API on valid submission", async () => {
    mockGetById.mockResolvedValue(mockProcedure);
    mockUpdate.mockResolvedValue({ data: { id: "proc-1" } });

    const { result } = renderHook(() => useProcedureEdit());

    await waitFor(() => {
      expect(result.current.isLoadingData).toBe(false);
    });

    act(() => {
      result.current.setName("Updated Name");
    });

    await waitFor(() => {
      expect(result.current.name).toBe("Updated Name");
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith("proc-1", {
        name: "Updated Name",
        description: "Official transcript",
        requirementsText: "Bring ID",
        isActive: true,
        requirements: [{ name: "Valid ID", description: "Valid ID", isMandatory: true }],
      });
    });
  });

  it("should handle update API error", async () => {
    mockGetById.mockResolvedValue(mockProcedure);
    mockUpdate.mockRejectedValue({
      response: { data: { message: "Update failed" } },
    });

    const { result } = renderHook(() => useProcedureEdit());

    await waitFor(() => {
      expect(result.current.isLoadingData).toBe(false);
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });
  });

  it("should add and remove requirements", async () => {
    mockGetById.mockResolvedValue(mockProcedure);

    const { result } = renderHook(() => useProcedureEdit());

    await waitFor(() => {
      expect(result.current.isLoadingData).toBe(false);
    });

    act(() => {
      result.current.handleAddRequirement();
    });

    expect(result.current.requirements).toEqual(["Valid ID", ""]);

    act(() => {
      result.current.handleRequirementChange(1, "New Req");
    });

    expect(result.current.requirements).toEqual(["Valid ID", "New Req"]);

    act(() => {
      result.current.handleRemoveRequirement(0);
    });

    expect(result.current.requirements).toEqual(["New Req"]);
  });
});
