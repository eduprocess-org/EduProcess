import { BellOff } from "lucide-react";

interface NotificationEmptyProps {
  message?: string;
}

export default function NotificationEmpty({
  message = "You don't have any notifications yet.",
}: NotificationEmptyProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-dashed
        border-slate-300
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        px-6
        py-16
        text-center
      "
    >
      <BellOff
        className="
          mb-4
          h-14
          w-14
          text-slate-400
        "
      />

      <h3
        className="
          text-lg
          font-semibold
          text-slate-800
          dark:text-slate-100
        "
      >
        No notifications
      </h3>

      <p
        className="
          mt-2
          max-w-md
          text-sm
          text-slate-500
          dark:text-slate-400
        "
      >
        {message}
      </p>
    </div>
  );
}