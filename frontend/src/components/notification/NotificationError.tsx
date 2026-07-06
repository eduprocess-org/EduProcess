import { TriangleAlert } from "lucide-react";

interface NotificationErrorProps {
  onRetry?: () => void;
}

export default function NotificationError({
  onRetry,
}: NotificationErrorProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-xl
        border
        border-red-200
        dark:border-red-800
        bg-red-50
        dark:bg-red-950/30
        px-6
        py-12
        text-center
      "
    >
      <TriangleAlert
        className="
          mb-4
          h-12
          w-12
          text-red-600
        "
      />

      <h3
        className="
          text-lg
          font-semibold
          text-red-700
          dark:text-red-300
        "
      >
        Unable to load notifications
      </h3>

      <p
        className="
          mt-2
          text-sm
          text-red-600
          dark:text-red-400
        "
      >
        Something went wrong while loading your notifications.
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="
            mt-5
            rounded-lg
            bg-red-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-red-700
          "
        >
          Retry
        </button>
      )}
    </div>
  );
}