export type NotificationType =
  | "REQUEST_CREATED"
  | "REQUEST_UPDATED"
  | "REQUEST_APPROVED"
  | "REQUEST_REJECTED"
  | "ADMIN_OBSERVATION";

export type NotificationRole = "ADMIN" | "STUDENT";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;

  createdAt: string;

  read: boolean;

  requestId?: string;

  userId: string;

  role: NotificationRole;
}