import { apiClient } from "../api/apiClient";
import { type Notification } from "../../types/notification/notification";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const { data } = await apiClient.get<ApiResponse<Notification[]>>("/notifications");
    return data.data;
  },

  async markAsRead(id: string): Promise<void> {
    await apiClient.patch(`/notifications/${id}/read`);
  },

  async markAllAsRead(): Promise<void> {
    await apiClient.patch("/notifications/read-all");
  },
};
