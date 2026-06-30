import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import NotificationsPage from "../notification/NotificationPage";

vi.mock("../../../hooks/useAuth", () => ({
  useAuth: () => ({
    user: { id: "student-1", role: "STUDENT" },
  }),
}));

vi.mock("../../../hooks/notification/useNotifications", () => ({
  useNotifications: () => ({
    data: [
      {
        id: "1",
        title: "Test Notification",
        message: "Test message",
        read: false,
        createdAt: "2026-06-01",
        requestId: "REQ-001",
      },
    ],
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  }),
}));

vi.mock("../../../hooks/notification/useMarkAsRead", () => ({
  useMarkAsRead: () => ({
    mutateAsync: vi.fn(),
  }),
}));

test("renders notifications page with data", () => {
  render(
    <MemoryRouter>
      <NotificationsPage />
    </MemoryRouter>
  );

  expect(screen.getByText("Notification Center")).toBeInTheDocument();
  expect(screen.getByText("Test Notification")).toBeInTheDocument();
});