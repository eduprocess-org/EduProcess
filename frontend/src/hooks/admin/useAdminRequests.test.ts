import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from "vitest";

import {
  renderHook,
  waitFor,
} from "@testing-library/react";

import { useAdminRequests } from "./useAdminRequests";

import {
  getAdminRequests,
} from "../../services/admin/requests/adminRequest.service";

vi.mock(
  "../../services/admin/requests/adminRequest.service",
  () => ({
    getAdminRequests: vi.fn(),
  })
);

describe("useAdminRequests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads requests", async () => {
    vi.mocked(getAdminRequests).mockResolvedValue({
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    });

    const { result } = renderHook(() =>
      useAdminRequests({
        page: 1,
        limit: 10,
        search: "",
        status: "",
        procedureTypeId: "",
        sortField: "createdAt",
        sortDirection: "desc",
      })
    );

    await waitFor(() => {
      expect(getAdminRequests).toHaveBeenCalled();
      expect(result.current.loading).toBe(false);
      expect(result.current.requests).toEqual([]);
      expect(result.current.total).toBe(0);
      expect(result.current.totalPages).toBe(1);
    });
  });

  it("handles api errors", async () => {
    vi.mocked(getAdminRequests).mockRejectedValue(
      new Error("Server error")
    );

    const { result } = renderHook(() =>
      useAdminRequests({
        page: 1,
        limit: 10,
        search: "",
        status: "",
        procedureTypeId: "",
        sortField: "createdAt",
        sortDirection: "desc",
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Server error");
    });
  });
});