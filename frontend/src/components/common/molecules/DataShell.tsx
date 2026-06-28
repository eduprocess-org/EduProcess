import { type ReactNode } from "react";
import { Button } from "../atoms/Button";

interface DataShellProps {
  isLoading: boolean;
  error: string | null;
  children: ReactNode;
  emptyMessage?: string;
  onRetry?: () => void;
}

export function DataShell({
  isLoading,
  error,
  children,
  emptyMessage = "No data available",
  onRetry,
}: DataShellProps) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-[#D9E3F0] bg-white p-8 shadow-sm">
        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-transparent border-t-[#1B2B5E] border-r-[#2563EB]" />
        <div>
          <p className="text-sm font-semibold text-[#1B2B5E]">Loading requests...</p>
          <p className="text-xs text-[#94A3B8]">Fetching latest data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-[#FECACA] bg-white p-5 shadow-sm">
        <p className="font-semibold text-[#B91C1C]">Something went wrong</p>
        <p className="mt-1 text-sm text-[#EF4444]">{error}</p>
        {onRetry && (
          <Button variant="primary" size="sm" className="mt-3" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </div>
    );
  }

  if (!isLoading && !error && !children) {
    return (
      <div className="rounded-2xl border border-[#D9E3F0] bg-white p-12 text-center shadow-sm">
        <p className="text-[#64748B]">{emptyMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
}