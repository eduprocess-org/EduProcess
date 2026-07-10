import NotificationCard from "./NotificationCard";

import { type Notification } from "../../types/notification/notification";

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
}

export default function NotificationList({
  notifications,
  onNotificationClick,
}: NotificationListProps) {
  return (
    <div className="flex flex-col gap-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onClick={onNotificationClick}
        />
      ))}
    </div>
  );
}