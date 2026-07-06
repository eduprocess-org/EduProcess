import { useMemo, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import NotificationEmpty from "../../../components/notification/NotificationEmpty";
import NotificationError from "../../../components/notification/NotificationError";
import NotificationFilters from "../../../components/notification/NotificationFilters";
import NotificationGroup from "../../../components/notification/NotificationGroup";
import NotificationLoading from "../../../components/notification/NotificationLoading";

import { useNotifications } from "../../../hooks/notification/useNotifications";
import { useMarkAsRead } from "../../../hooks/notification/useMarkAsRead";
import { useMarkAllAsRead } from "../../../hooks/notification/useMarkAllAsRead";
import { useAuth } from "../../../hooks/useAuth";

import { groupNotifications } from "../../../utils/notification";

import { type Notification } from "../../../types/notification/notification";

type Filter = "ALL" | "READ" | "UNREAD";

export default function NotificationsPage() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [filter, setFilter] = useState<Filter>("ALL");

  const {
    data: notifications = [],
    isLoading,
    isError,
    refetch,
  } = useNotifications();

  const markAsRead = useMarkAsRead();
  const markAllAsRead = useMarkAllAsRead();

  const filteredNotifications = useMemo(() => {
    switch (filter) {
      case "READ":
        return notifications.filter((notification) => notification.read);

      case "UNREAD":
        return notifications.filter((notification) => !notification.read);

      default:
        return notifications;
    }
  }, [filter, notifications]);

  const groups = useMemo(
    () => groupNotifications(filteredNotifications),
    [filteredNotifications]
  );

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleNotificationClick = async (
    notification: Notification
  ) => {
    if (!notification.read) {
      await markAsRead.mutateAsync(notification.id);
    }

    if (!notification.requestId) {
      return;
    }

    if (user?.role === "admin") {
      navigate(`/admin/requests/${notification.requestId}`);
    } else {
      navigate(`/requests/${notification.requestId}/tracking`);
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead.mutateAsync();
  };

  if (isLoading) {
    return <NotificationLoading />;
  }

  if (isError) {
    return <NotificationError onRetry={refetch} />;
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6 p-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Bell className="h-8 w-8 text-blue-600" />

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Notification Center
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {unreadCount} unread notification
              {unreadCount !== 1 && "s"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <NotificationFilters
            value={filter}
            onChange={setFilter}
          />

          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0 || markAllAsRead.isPending}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <CheckCheck size={18} />

            {markAllAsRead.isPending
              ? "Updating..."
              : "Mark all as read"}
          </button>
        </div>
      </header>

      {groups.length === 0 ? (
        <NotificationEmpty />
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <NotificationGroup
              key={group.title}
              title={group.title}
              notifications={group.notifications}
              onClick={handleNotificationClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}