import { type Notification } from "../../types/notification/notification";
import { mockNotifications } from "./mockNotifications";

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    await delay(500);

    return mockNotifications.map((notification) => ({
      ...notification,
    }));
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

    return { ...notification };
  },

  async markAllAsRead(): Promise<void> {
    await delay(300);

    mockNotifications.forEach((notification) => {
      notification.read = true;
    });
  },

  async getUnreadNotifications(): Promise<Notification[]> {
    await delay(300);

    return mockNotifications
      .filter((notification) => !notification.read)
      .map((notification) => ({ ...notification }));
  },
};