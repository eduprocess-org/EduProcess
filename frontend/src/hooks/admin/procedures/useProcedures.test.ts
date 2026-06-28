import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useProcedures } from "./useProcedures";

const mockData = [
  {
    id: "1",
    name: "Academic Certificate",
    description: "Official certificate",
    requirementsText: "ID required",
    isActive: true,
    facultyId: null,
    careerId: null,
    facultyName: null,
    careerName: null,
    requirementsCount: 1,
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-10T00:00:00.000Z",
  },
];

const mockGetAll = vi.fn();

vi.mock("../../../services/admin/procedures/procedures.service", () => ({
  adminProceduresApi: {
    getAll: (...args: any[]) => mockGetAll(...args),
  },
}));

vi.mock("sonner", () => ({
  toast: { error: vi.fn(), success: vi.fn() },
}));

describe("useProcedures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch and return procedures", async () => {
    mockGetAll.mockResolvedValue({
      data: mockData,
      pagination: { total: 1, page: 1, limit: 5, totalPages: 1 },
    });

    const { result } = renderHook(() => useProcedures());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.procedures).toEqual(mockData);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPages).toBe(1);
  });

  it("should update search and re-fetch", async () => {
    mockGetAll.mockResolvedValue({
      data: mockData,
      pagination: { total: 1, page: 1, limit: 5, totalPages: 1 },
    });

    const { result } = renderHook(() => useProcedures());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    mockGetAll.mockResolvedValue({
      data: [],
      pagination: { total: 0, page: 1, limit: 5, totalPages: 0 },
    });

    result.current.setSearch("nonexistent");

    await waitFor(() => {
      expect(result.current.procedures).toEqual([]);
    });
  });

  it("should change page", async () => {
    mockGetAll.mockResolvedValue({
      data: mockData,
      pagination: { total: 1, page: 1, limit: 5, totalPages: 1 },
    });

    const { result } = renderHook(() => useProcedures());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
  });

  it("should handle api errors", async () => {
    mockGetAll.mockRejectedValue({
      response: { data: { message: "Server error" } },
    });

    const { result } = renderHook(() => useProcedures());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.procedures).toEqual([]);
  });

  it("should refresh data when refresh is called", async () => {
    mockGetAll.mockResolvedValue({
      data: mockData,
      pagination: { total: 1, page: 1, limit: 5, totalPages: 1 },
    });

    const { result } = renderHook(() => useProcedures());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    mockGetAll.mockResolvedValue({
      data: [],
      pagination: { total: 0, page: 1, limit: 5, totalPages: 0 },
    });

    result.current.refresh();

    await waitFor(() => {
      expect(result.current.procedures).toEqual([]);
    });
  });
});
