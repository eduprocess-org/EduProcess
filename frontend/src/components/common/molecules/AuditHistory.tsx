import { Clock } from "lucide-react";

interface HistoryEntry {
  id: string;
  action: string;
  adminName: string;
  oldValue?: string | null;
  newValue?: string | null;
  createdAt: string;
}

export function AuditHistory({ history }: { history: HistoryEntry[] }) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8">
        <Clock size={20} className="text-[#E2EAF4]" />
        <p className="text-xs text-[#94A3B8]">No records yet.</p>
      </div>
    );
  }

  return (
    <div className="relative border-l-2 border-[#E2EAF4] pl-4">
      {history.map((entry) => {
        const isApproved = entry.newValue?.toUpperCase() === "APPROVED";
        const isRejected = entry.newValue?.toUpperCase() === "REJECTED";
        const dotColor = isApproved ? "#059669" : isRejected ? "#DC2626" : "#1A52A8";

        return (
          <div key={entry.id} className="relative mb-5 last:mb-0">
            <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white" style={{ background: dotColor }} />
            <div className="mb-0.5 flex items-center justify-between gap-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: dotColor }}>{entry.action}</span>
              <span className="text-[10px] text-[#94A3B8]">{new Date(entry.createdAt).toLocaleDateString("en-US")}</span>
            </div>
            <p className="text-[11px] text-[#64748B]">by {entry.adminName}</p>
            {entry.oldValue && entry.newValue && (
              <p className="mt-1 rounded-lg bg-[#F1F5FB] px-2 py-1 text-[11px] italic text-[#334155] border border-[#E2EAF4]">
                "{entry.oldValue}" → "{entry.newValue}"
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}