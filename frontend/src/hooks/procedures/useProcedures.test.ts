import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useProcedures } from "./useProcedures";

describe("useProcedures", () => {
  it(
    "should return procedures",
    async () => {
      const { result } =
        renderHook(() =>
          useProcedures()
        );

      expect(
        result.current.loading
      ).toBe(true);
    }
  );
});