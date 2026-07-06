interface ErrorDisplayProps {
  message?: string;
  backAction?: () => void;
  backLabel?: string;
}

export function ErrorDisplay({ message = "Request not found.", backAction, backLabel = "Back to list" }: ErrorDisplayProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-[#F1F5FB] dark:bg-gray-950">
      <p className="text-sm font-semibold text-[#0F172A] dark:text-slate-200">{message}</p>
      {backAction && (
        <button
          onClick={backAction}
          className="text-xs font-bold underline underline-offset-4 text-[#1A52A8] dark:text-blue-400"
        >
          {backLabel}
        </button>
      )}
    </div>
  );
}