import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProcedureForm } from "./useProcedureForm";
import type React from "react";

const mockCreate = vi.fn();

vi.mock("../../../services/admin/procedures/procedures.service", () => ({
  adminProceduresApi: {
    create: (...args: any[]) => mockCreate(...args),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function renderHookWithQuery(fn: () => any) {
  const queryClient = createTestQueryClient();
  return renderHook(fn, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
}

describe("useProcedureForm", () => {
  const onSuccess = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHookWithQuery(() => useProcedureForm(onSuccess));

    expect(result.current.form.name).toBe("");
    expect(result.current.form.description).toBe("");
    expect(result.current.form.requirements).toEqual([""]);
    expect(result.current.form.requirementsText).toBe("");
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  it("should show validation errors when submitting empty form", () => {
    const { result } = renderHookWithQuery(() => useProcedureForm(onSuccess));

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.errors.name).toBe("The procedure name is required.");
    expect(result.current.errors.description).toBe("The description is required.");
    expect(result.current.errors.requirements).toBe("Please specify at least one requirement.");
  });

  it("should update form fields via setters", () => {
    const { result } = renderHookWithQuery(() => useProcedureForm(onSuccess));

    act(() => {
      result.current.setters.setName("Test Procedure");
      result.current.setters.setDescription("Test Description");
      result.current.setters.setRequirements(["Req 1", "Req 2"]);
      result.current.setters.setRequirementsText("Some summary");
    });

    expect(result.current.form.name).toBe("Test Procedure");
    expect(result.current.form.description).toBe("Test Description");
    expect(result.current.form.requirements).toEqual(["Req 1", "Req 2"]);
    expect(result.current.form.requirementsText).toBe("Some summary");
  });

  it("should call create API on valid submission", async () => {
    mockCreate.mockResolvedValue({ data: { id: "new-1", name: "Test" } });

    const { result } = renderHookWithQuery(() => useProcedureForm(onSuccess));

    act(() => {
      result.current.setters.setName("Test Procedure");
      result.current.setters.setDescription("Test Description");
      result.current.setters.setRequirements(["Req 1"]);
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalled();
      expect(mockCreate).toHaveBeenCalledWith({
        name: "Test Procedure",
        description: "Test Description",
        requirementsText: undefined,
        isActive: true,
        requirements: [{ name: "Req 1", description: "Req 1", isMandatory: true }],
      });
    });
  });

  it("should handle API error on submission", async () => {
    mockCreate.mockRejectedValue({
      response: { data: { message: "Creation failed" } },
    });

    const { result } = renderHookWithQuery(() => useProcedureForm(onSuccess));

    act(() => {
      result.current.setters.setName("Test Procedure");
      result.current.setters.setDescription("Test Description");
      result.current.setters.setRequirements(["Req 1"]);
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() } as any);
    });

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalled();
    });
  });
});
