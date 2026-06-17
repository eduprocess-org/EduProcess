import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  it,
  expect,
  vi,
} from "vitest";

import { MemoryRouter } from "react-router-dom";

import StudentDashboardPage from "../StudentDashboardPage";

import {
  useStudentRequests,
} from "../../../../hooks/dashboard/useStudentRequests";

vi.mock(
  "../../../../hooks/dashboard/useStudentRequests"
);

describe(
  "StudentDashboardPage",
  () => {
    it(
      "shows loading state",
      () => {
        vi.mocked(
          useStudentRequests
        ).mockReturnValue({
          requests: [],
          loading: true,
          error: null,
          reload: vi.fn(),
        });

        const { container } = render(
          <MemoryRouter>
            <StudentDashboardPage />
          </MemoryRouter>
        );

        expect(
          container.querySelector(".animate-pulse")
        ).toBeTruthy();
      }
    );

    it(
      "shows error state",
      () => {
        vi.mocked(
          useStudentRequests
        ).mockReturnValue({
          requests: [],
          loading: false,
          error:
            "Failed to load requests",
          reload: vi.fn(),
        });

        render(
          <MemoryRouter>
            <StudentDashboardPage />
          </MemoryRouter>
        );

        expect(
          screen.getByText(
            /Failed to load requests/i
          )
        ).toBeInTheDocument();
      }
    );

    it(
      "shows empty state",
      () => {
        vi.mocked(
          useStudentRequests
        ).mockReturnValue({
          requests: [],
          loading: false,
          error: null,
          reload: vi.fn(),
        });

        render(
          <MemoryRouter>
            <StudentDashboardPage />
          </MemoryRouter>
        );

        expect(
          screen.getByText(
            /No Requests Found/i
          )
        ).toBeInTheDocument();
      }
    );

    it(
      "shows requests",
      () => {
        vi.mocked(
          useStudentRequests
        ).mockReturnValue({
          requests: [
            {
              id: "REQ-001",
              procedureId: "PROC-001",
              procedureName:
                "Academic Certificate",
              status:
                "PENDING",
              createdAt:
                "2026-06-12",
            },
          ],
          loading: false,
          error: null,
          reload: vi.fn(),
        });

        render(
          <MemoryRouter>
            <StudentDashboardPage />
          </MemoryRouter>
        );

        expect(
          screen.getByText(
            "Academic Certificate"
          )
        ).toBeInTheDocument();
      }
    );
  }
);