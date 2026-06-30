interface NotificationBadgeProps {
  read: boolean;
}

export default function NotificationBadge({
  read,
}: NotificationBadgeProps) {
  if (read) {
    return (
      <span
        className="
          rounded-full
          bg-slate-100
          dark:bg-slate-700
          px-2
          py-1
          text-xs
          font-medium
          text-slate-600
          dark:text-slate-300
        "
      >
        Read
      </span>
    );
  }

  return (
    <span
      className="
        rounded-full
        bg-blue-100
        dark:bg-blue-900/40
        px-2
        py-1
        text-xs
        font-semibold
        text-blue-700
        dark:text-blue-300
      "
    >
      New
    </span>
  );
}