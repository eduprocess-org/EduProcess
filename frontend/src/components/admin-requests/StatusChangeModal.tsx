import { AlertTriangle } from "lucide-react";
import type { RequestStatus } from "../../types/admin/adminRequest.types";

interface StatusChangeModalProps {
  isOpen: boolean;
  pendingStatus: RequestStatus | null;
  comment: string;
  updating: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function StatusChangeModal({
  isOpen,
  pendingStatus,
  comment,
  updating,
  onConfirm,
  onCancel,
}: StatusChangeModalProps) {
  if (!isOpen || !pendingStatus) return null;

  const isApproved = pendingStatus === "approved";
  const isRejected = pendingStatus === "rejected";

  const lightColor  = isApproved ? "#059669"  : isRejected ? "#DC2626"  : "#1A52A8";
  const lightBg     = isApproved ? "#ECFDF5"  : isRejected ? "#FEF2F2"  : "#EFF6FF";
  const darkColor   = isApproved ? "#34D399"  : isRejected ? "#F87171"  : "#93C5FD";
  const darkBg      = isApproved ? "rgba(16,185,129,0.15)" : isRejected ? "rgba(248,113,113,0.15)" : "rgba(147,197,253,0.15)";
  const shadow      = isApproved
    ? "0 3px 12px rgba(5,150,105,.30)"
    : isRejected
    ? "0 3px 12px rgba(220,38,38,.25)"
    : "0 3px 12px rgba(26,82,168,.25)";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(11,45,99,.40)] dark:bg-[rgba(0,0,0,.60)] p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-[#E2EAF4] dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-2xl">

        {/* Icon */}
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl dark:hidden" style={{ background: lightBg }}>
          <AlertTriangle size={20} style={{ color: lightColor }} />
        </div>
        <div className="mb-4 hidden dark:flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: darkBg }}>
          <AlertTriangle size={20} style={{ color: darkColor }} />
        </div>

        <h3 className="mb-1 text-base font-extrabold text-[#0F172A] dark:text-slate-100">
          Confirm status change
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-[#64748B] dark:text-slate-400">
          Mark this request as{" "}
          <span className="font-extrabold uppercase dark:hidden" style={{ color: lightColor }}>{pendingStatus}</span>
          <span className="font-extrabold uppercase hidden dark:inline" style={{ color: darkColor }}>{pendingStatus}</span>
          ? This cannot be undone.
        </p>

        {comment.trim() && (
          <div className="mb-4 rounded-xl border border-[#E2EAF4] dark:border-gray-700 bg-[#F1F5FB] dark:bg-gray-800 p-3 text-xs italic text-[#334155] dark:text-slate-300">
            <strong>Note:</strong> "{comment}"
          </div>
        )}

        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-[#E2EAF4] dark:border-gray-600 py-2.5 text-xs font-bold text-[#0F172A] dark:text-slate-200 transition-colors hover:bg-slate-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={updating}
            className="flex-1 rounded-xl py-2.5 text-xs font-extrabold text-white transition-all active:scale-95 disabled:opacity-50"
            style={{ background: lightColor, boxShadow: shadow }}
          >
            {updating ? "Updating…" : "Yes, confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}