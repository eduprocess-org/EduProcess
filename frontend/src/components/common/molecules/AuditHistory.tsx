import type { CSSProperties } from "react";
import { Clock } from "lucide-react";

interface HistoryEntry {
  id: string;
  action: string;
  adminName: string;
  oldValue?: string | null;
  newValue?: string | null;
  createdAt: string;
}

const HISTORY_STYLE = `
  .ah-dot {
    background-color: var(--ah-color);
    border: 2px solid #fff;
  }
  .dark .ah-dot {
    background-color: var(--ah-dark-color);
    border-color: #111827;
  }
  .ah-action {
    color: var(--ah-color);
  }
  .dark .ah-action {
    color: var(--ah-dark-color);
  }
`;

export function AuditHistory({ history }: { history: HistoryEntry[] }) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8">
        <Clock size={20} className="text-[#E2EAF4] dark:text-gray-600" />
        <p className="text-xs text-[#94A3B8] dark:text-slate-500">No records yet.</p>
      </div>
    );
  }

  return (
    <div className="relative border-l-2 border-[#E2EAF4] dark:border-gray-700 pl-4">
      <style>{HISTORY_STYLE}</style>
      {history.map((entry) => {
        const isApproved = entry.newValue?.toUpperCase() === "APPROVED";
        const isRejected = entry.newValue?.toUpperCase() === "REJECTED";

        const dotColor     = isApproved ? "#059669" : isRejected ? "#DC2626" : "#1A52A8";
        const dotColorDark = isApproved ? "#34D399" : isRejected ? "#F87171" : "#60A5FA";

        const entryVars = {
          "--ah-color": dotColor,
          "--ah-dark-color": dotColorDark,
        } as CSSProperties;

        return (
          <div key={entry.id} className="relative mb-5 last:mb-0" style={entryVars}>
            <div className="ah-dot absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full" />

            <div className="mb-0.5 flex items-center justify-between gap-1">
              <span className="ah-action text-[10px] font-extrabold uppercase tracking-wider">
                {entry.action}
              </span>
              <span className="text-[10px] text-[#94A3B8] dark:text-slate-500">
                {new Date(entry.createdAt).toLocaleDateString("en-US")}
              </span>
            </div>

            <p className="text-[11px] text-[#64748B] dark:text-slate-400">by {entry.adminName}</p>

            {entry.oldValue && entry.newValue && (
              <p className="mt-1 rounded-lg bg-[#F1F5FB] dark:bg-gray-800 px-2 py-1 text-[11px] italic text-[#334155] dark:text-slate-300 border border-[#E2EAF4] dark:border-gray-700">
                "{entry.oldValue}" → "{entry.newValue}"
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}