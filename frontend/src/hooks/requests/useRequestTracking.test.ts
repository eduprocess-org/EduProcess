import {
  renderHook,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  useRequestTracking,
} from "./useRequestTracking";

describe(
  "useRequestTracking",
  () => {
    it(
      "should return loading state",
      () => {
        const {
          result,
        } = renderHook(() =>
          useRequestTracking(
            "REQ-001"
          )
        );

        expect(
          result.current.loading
        ).toBe(true);
      }
    );
  }
);