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
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import ProcedureDetailsPage from "./ProcedureDetailsPage";

import * as useProcedureDetailsHook from "../../hooks/procedures/useProcedureDetails";

afterEach(() => {
  vi.restoreAllMocks();
});

describe(
  "ProcedureDetailsPage",
  () => {
    it(
      "renders procedure details successfully",
      () => {
        vi.spyOn(
          useProcedureDetailsHook,
          "useProcedureDetails"
        ).mockReturnValue({
          procedure: {
            id: "1",
            name:
              "Academic Transcript",
            description:
              "Official transcript",
            category:
              "Academic",
            estimatedProcessingTime:
              "3 business days",
            requirements: [
              "Be enrolled",
            ],
            documents: [
              "Student ID",
            ],
            instructions: [
              "Complete the form",
            ],
          },
          loading: false,
          error: "",
        });

        render(
          <MemoryRouter
            initialEntries={[
              "/procedures/1",
            ]}
          >
            <Routes>
              <Route
                path="/procedures/:id"
                element={
                  <ProcedureDetailsPage />
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
          useProcedureDetailsHook,
          "useProcedureDetails"
        ).mockReturnValue({
          procedure: null,
          loading: false,
          error:
            "Unable to load procedure details",
        });

        render(
          <MemoryRouter
            initialEntries={[
              "/procedures/1",
            ]}
          >
            <Routes>
              <Route
                path="/procedures/:id"
                element={
                  <ProcedureDetailsPage />
                }
              />
            </Routes>
          </MemoryRouter>
        );

        expect(
          screen.getByText(
            /unable to load procedure details/i
          )
        ).toBeInTheDocument();
      }
    );

    it(
      "renders not found state",
      () => {
        vi.spyOn(
          useProcedureDetailsHook,
          "useProcedureDetails"
        ).mockReturnValue({
          procedure: null,
          loading: false,
          error: "",
        });

        render(
          <MemoryRouter
            initialEntries={[
              "/procedures/999",
            ]}
          >
            <Routes>
              <Route
                path="/procedures/:id"
                element={
                  <ProcedureDetailsPage />
                }
              />
            </Routes>
          </MemoryRouter>
        );

        expect(
          screen.getByText(
            /procedure not found/i
          )
        ).toBeInTheDocument();
      }
    );
  }
);