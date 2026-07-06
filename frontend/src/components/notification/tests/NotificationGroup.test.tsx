import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { type Notification, type NotificationType } from "../../../types/notification/notification";
import NotificationGroup from "../NotificationGroup";

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Hello",
    message: "World",
    type: "REQUEST_APPROVED" as NotificationType,
    createdAt: "2026-01-01",
    read: false,
    userId: "student-1",
    role: "STUDENT",
  },
];

test("renders notification group correctly", () => {
  render(
    <NotificationGroup
      title="Today"
      notifications={mockNotifications}
      onClick={vi.fn()}
    />
  );

  expect(screen.getByText("Today")).toBeInTheDocument();
  expect(screen.getByText("Hello")).toBeInTheDocument();
  expect(screen.getByText("World")).toBeInTheDocument();
});