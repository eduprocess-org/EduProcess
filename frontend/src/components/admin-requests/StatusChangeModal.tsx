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

export function StatusChangeModal({ isOpen, pendingStatus, comment, updating, onConfirm, onCancel }: StatusChangeModalProps) {
  if (!isOpen || !pendingStatus) return null;

  const isApproved = pendingStatus === "approved";
  const isRejected = pendingStatus === "rejected";
  const color = isApproved ? "#059669" : isRejected ? "#DC2626" : "#1A52A8";
  const bg = isApproved ? "#ECFDF5" : isRejected ? "#FEF2F2" : "#EFF6FF";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(11,45,99,.40)] p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-[#E2EAF4] bg-white p-6 shadow-2xl">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: bg }}>
          <AlertTriangle size={20} style={{ color }} />
        </div>
        <h3 className="mb-1 text-base font-extrabold text-[#0F172A]">Confirm status change</h3>
        <p className="mb-4 text-sm leading-relaxed text-[#64748B]">
          Mark this request as <span className="font-extrabold uppercase" style={{ color }}>{pendingStatus}</span>? This cannot be undone.
        </p>
        {comment.trim() && (
          <div className="mb-4 rounded-xl border border-[#E2EAF4] bg-[#F1F5FB] p-3 text-xs italic text-[#334155]">
            <strong>Note:</strong> "{comment}"
          </div>
        )}
        <div className="flex gap-2.5">
          <button onClick={onCancel} className="flex-1 rounded-xl border border-[#E2EAF4] py-2.5 text-xs font-bold text-[#0F172A] transition-colors hover:bg-slate-50">Cancel</button>
          <button onClick={onConfirm} disabled={updating} className="flex-1 rounded-xl py-2.5 text-xs font-extrabold text-white transition-all active:scale-95 disabled:opacity-50" style={{ background: color, boxShadow: isApproved ? "0 3px 12px rgba(5,150,105,.30)" : isRejected ? "0 3px 12px rgba(220,38,38,.25)" : "0 3px 12px rgba(26,82,168,.25)" }}>
            {updating ? "Updating…" : "Yes, confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}