import { type Notification } from "../../types/notification/notification";
import { mockNotifications } from "./mockNotifications";

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const notificationService = {

  async getNotifications(userId: string): Promise<Notification[]> {
    await delay(500);

    const notifications = mockNotifications.filter(
      (notification) => notification.userId === userId
    );

    return structuredClone(notifications);
  },


  async markAsRead(id: string): Promise<Notification> {
    await delay(300);

    const notification = mockNotifications.find(
      (notification) => notification.id === id
    );

    if (!notification) {
      throw new Error("Notification not found.");
    }

    notification.read = true;

    return structuredClone(notification);
  },


  async markAllAsRead(userId: string): Promise<void> {
    await delay(300);

    mockNotifications.forEach((notification) => {
      if (notification.userId === userId) {
        notification.read = true;
      }
    });
  },


  async getUnreadNotifications(userId: string): Promise<Notification[]> {
    await delay(300);

    const notifications = mockNotifications.filter(
      (notification) =>
        notification.userId === userId && !notification.read
    );

    return structuredClone(notifications);
  },
};