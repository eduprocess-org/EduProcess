import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProcedures } from "./useProcedures";

describe("useProcedures", () => {
  it("should return initial procedures", () => {
    const { result } = renderHook(() => useProcedures());

    expect(result.current.procedures.length).toBeGreaterThan(0);
  });

  it("should filter by search", () => {
    const { result } = renderHook(() => useProcedures());

    act(() => {
      result.current.setSearch("Academic");
    });

    expect(result.current.procedures[0].name).toContain("Academic");
  });

  it("should change page", () => {
    const { result } = renderHook(() => useProcedures());

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
  });
});