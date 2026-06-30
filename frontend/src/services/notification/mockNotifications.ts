import { type Notification } from "../../types/notification/notification";

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Request Approved",
    message: "Your enrollment certificate request has been approved.",
    type: "REQUEST_APPROVED",
    createdAt: "2026-06-27T18:30:00",
    read: false,
    requestId: "REQ-001",
    userId: "a2bf6ab6-b2a2-41fa-91b9-cfdbbf7ace33",
    role: "STUDENT"
  },

  {
    id: "2",
    title: "Administrative Observation",
    message: "Please upload the requested document.",
    type: "ADMIN_OBSERVATION",
    createdAt: "2026-06-27T14:00:00",
    read: true,
    requestId: "REQ-003",
    userId: "a2bf6ab6-b2a2-41fa-91b9-cfdbbf7ace33",
    role: "STUDENT"
  },

  {
    id: "3",
    title: "New Request Received",
    message: "A student has submitted a new request.",
    type: "REQUEST_CREATED",
    createdAt: "2026-06-27T09:10:00",
    read: false,
    requestId: "REQ-010",
    userId: "64f4fa90-4ac1-4565-8f1c-eb48538cd6d2",
    role: "ADMIN"
  }
];