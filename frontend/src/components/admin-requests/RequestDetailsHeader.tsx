import { RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import RequestStatusBadge from "./RequestStatusBadge";
import type { RequestStatus } from "../../types/admin/adminRequest.types";

interface RequestDetailsHeaderProps {
  id: string;
  title: string;
  status: RequestStatus;
  isTerminal: boolean;
  currentStatus: string;
  updating: boolean;
  onStartReview: () => void;
  onApprove: () => void;
  onReject: () => void;
}

export function RequestDetailsHeader({
  id,
  title,
  status,
  isTerminal,
  currentStatus,
  updating,
  onStartReview,
  onApprove,
  onReject,
}: RequestDetailsHeaderProps) {
  const terminalColor =
    currentStatus === "approved"
      ? "text-[#059669] dark:text-emerald-400"
      : "text-[#DC2626] dark:text-red-400";

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-[#EFF6FF] dark:bg-blue-900/40 px-2 py-0.5 font-mono text-[10px] font-bold text-[#1A52A8] dark:text-blue-300">
            {id}
          </span>
          <RequestStatusBadge status={status} />
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight text-[#0B2D63] dark:text-blue-100">
          {title}
        </h1>

        {isTerminal && (
          <p className="text-xs text-[#64748B] dark:text-slate-400">
            This request has been{" "}
            <span className={`font-bold ${terminalColor}`}>{currentStatus}</span>{" "}
            and can no longer be modified.
          </p>
        )}
      </div>

      {!isTerminal && (
        <div className="flex gap-2">
          {currentStatus === "pending" && (
            <button
              onClick={onStartReview}
              disabled={updating}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#1A52A8] dark:bg-blue-700 px-5 py-2.5 text-xs font-bold text-white shadow-[0_3px_12px_rgba(26,82,168,.30)] transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RefreshCw size={13} /> Start Review
            </button>
          )}
          {currentStatus === "in_review" && (
            <>
              <button
                onClick={onApprove}
                disabled={updating}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#059669] dark:bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-[0_3px_12px_rgba(5,150,105,.30)] transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <CheckCircle2 size={13} /> Approve
              </button>
              <button
                onClick={onReject}
                disabled={updating}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#DC2626] dark:bg-red-700 px-5 py-2.5 text-xs font-bold text-white shadow-[0_3px_12px_rgba(220,38,38,.25)] transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <XCircle size={13} /> Reject
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}