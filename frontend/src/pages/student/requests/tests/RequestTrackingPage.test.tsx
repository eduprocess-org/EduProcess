import {
  render,
  screen,
} from "@testing-library/react";

import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";

import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import RequestTrackingPage
  from "../RequestTrackingPage";

import * as trackingHook
  from "../../../../hooks/requests/useRequestTracking";

describe(
  "RequestTrackingPage",
  () => {
    it(
      "renders tracking information",
      () => {
        vi.spyOn(
          trackingHook,
          "useRequestTracking"
        ).mockReturnValue({
          tracking: {
            requestId: "REQ-001",

            procedureName:
              "Academic Transcript",

            status:
              "Under Review",

            submissionDate:
              "2026-06-01",

            lastUpdateDate:
              "2026-06-10",

            administrativeComments:
              "Reviewing documents",

            timeline: [],
          },

          loading: false,
          error: "",
          refresh: vi.fn(),
        });

        render(
          <MemoryRouter
            initialEntries={[
              "/tracking/REQ-001",
            ]}
          >
            <Routes>
              <Route
                path="/tracking/:id"
                element={
                  <RequestTrackingPage />
                }
              />
            </Routes>
          </MemoryRouter>
        );

        expect(
          screen.getByText(
            "Academic Transcript"
          )
        ).toBeInTheDocument();
      }
    );

    it(
      "renders error state",
      () => {
        vi.spyOn(
          trackingHook,
          "useRequestTracking"
        ).mockReturnValue({
          tracking: null,
          loading: false,
          error:
            "Failed to load tracking information.",
          refresh: vi.fn(),
        });

        render(
          <MemoryRouter
            initialEntries={[
              "/tracking/REQ-001",
            ]}
          >
            <Routes>
              <Route
                path="/tracking/:id"
                element={
                  <RequestTrackingPage />
                }
              />
            </Routes>
          </MemoryRouter>
        );

        expect(
          screen.getByText(
            /something went wrong/i
          )
        ).toBeInTheDocument();
      }
    );

    it(
      "renders not found state",
      () => {
        vi.spyOn(
          trackingHook,
          "useRequestTracking"
        ).mockReturnValue({
          tracking: null,
          loading: false,
          error: "",
          refresh: vi.fn(),
        });

        render(
          <MemoryRouter
            initialEntries={[
              "/tracking/999",
            ]}
          >
            <Routes>
              <Route
                path="/tracking/:id"
                element={
                  <RequestTrackingPage />
                }
              />
            </Routes>
          </MemoryRouter>
        );

        expect(
          screen.getByText(
            /tracking information not found/i
          )
        ).toBeInTheDocument();
      }
    );
  }
);