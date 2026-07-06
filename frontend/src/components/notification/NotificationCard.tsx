import {
  Bell,
  CheckCircle2,
  CircleAlert,
  FileText,
  XCircle,
} from "lucide-react";

import NotificationBadge from "./NotificationBadge";

import { type Notification } from "../../types/notification/notification";

interface NotificationCardProps {
  notification: Notification;

  onClick?: (notification: Notification) => void;
}

function getIcon(type: Notification["type"]) {
  switch (type) {
    case "REQUEST_APPROVED":
      return (
        <CheckCircle2
          className="h-6 w-6 text-green-600 dark:text-green-400"
        />
      );

    case "REQUEST_REJECTED":
      return (
        <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
      );

    case "ADMIN_OBSERVATION":
      return (
        <CircleAlert className="h-6 w-6 text-yellow-500" />
      );

    case "REQUEST_CREATED":
      return (
        <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      );

    default:
      return (
        <Bell className="h-6 w-6 text-slate-500" />
      );
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function NotificationCard({
  notification,
  onClick,
}: NotificationCardProps) {
  return (
    <button
      onClick={() => onClick?.(notification)}
      className="
        flex
        w-full
        items-start
        gap-4
        rounded-xl
        border
        border-slate-200
        bg-white
        p-4
        text-left
        transition-all
        hover:bg-slate-50
        dark:border-slate-700
        dark:bg-slate-900
        dark:hover:bg-slate-800
      "
    >
      <div>{getIcon(notification.type)}</div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3
            className={`
                text-sm
                ${
                  notification.read
                    ? "font-medium"
                    : "font-semibold"
                }
                text-slate-900
                dark:text-slate-100
            `}
          >
            {notification.title}
          </h3>

          <NotificationBadge read={notification.read} />
        </div>

        <p
          className="
            text-sm
            text-slate-600
            dark:text-slate-300
          "
        >
          {notification.message}
        </p>

        <span
          className="
            text-xs
            text-slate-400
          "
        >
          {formatDate(notification.createdAt)}
        </span>
      </div>
    </button>
  );
}