interface ErrorDisplayProps {
  message?: string;
  backAction?: () => void;
  backLabel?: string;
}

export function ErrorDisplay({ message = "Request not found.", backAction, backLabel = "Back to list" }: ErrorDisplayProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-[#F1F5FB]">
      <p className="text-sm font-semibold text-[#0F172A]">{message}</p>
      {backAction && (
        <button onClick={backAction} className="text-xs font-bold underline underline-offset-4 text-[#1A52A8]">
          {backLabel}
        </button>
      )}
    </div>
  );
}