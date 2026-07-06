import { describe, it, expect } from "vitest";
import { groupNotifications } from "../notification";

describe("groupNotifications", () => {
  it("groups notifications by date", () => {
    const result = groupNotifications([
      {
         id: "1",
        title: "Test Notification",
        message: "Test message",
        type: "REQUEST_APPROVED",
        createdAt: "2026-06-01",
        read: false,
        requestId: "REQ-001",
        userId: "student-1",
        role: "STUDENT",
      },
      {
        id: "2",
        title: "Test Notification",
        message: "Test message",
        type: "REQUEST_APPROVED",
        createdAt: "2026-06-01",
        read: false,
        requestId: "REQ-002",
        userId: "student-2",
        role: "STUDENT",
      },
    ]);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("title");
  });
});