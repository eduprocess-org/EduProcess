import {
  render,
  screen,
} from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import { describe, expect, it } from "vitest";

import ProcedureCard from "./ProcedureCard";

describe(
  "ProcedureCard",
  () => {
    it(
      "renders procedure name",
      () => {
        render(
          <BrowserRouter>
            <ProcedureCard
              procedure={{
                id: "1",
                name:
                  "Academic Transcript",
                description:
                  "Test",
                estimatedProcessingTime:
                  "3 days",
                category:
                  "Academic",
              }}
            />
          </BrowserRouter>
        );

        expect(
          screen.getByText(
            "Academic Transcript"
          )
        ).toBeInTheDocument();
      }
    );
  }
);