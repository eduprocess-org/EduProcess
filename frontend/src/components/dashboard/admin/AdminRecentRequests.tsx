import type { RecentRequest } from "../../../types/admin/adminDashboard.types";
import { Inbox } from "lucide-react";

interface Props {
  requests: RecentRequest[];
}

const STATUS_STYLES: Record<
  string,
  { bg: string; text: string; darkBg: string; darkText: string }
> = {
  PENDING: {
    bg: "rgba(217,119,6,0.10)",
    text: "#B45309",
    darkBg: "rgba(252,211,77,0.12)",
    darkText: "#FCD34D",
  },
  APPROVED: {
    bg: "rgba(22,163,74,0.10)",
    text: "#15803D",
    darkBg: "rgba(74,222,128,0.12)",
    darkText: "#4ADE80",
  },
  REJECTED: {
    bg: "rgba(220,38,38,0.10)",
    text: "#B91C1C",
    darkBg: "rgba(248,113,113,0.12)",
    darkText: "#F87171",
  },
};

const FALLBACK_STYLE = {
  bg: "rgba(100,116,139,0.10)",
  text: "#475569",
  darkBg: "rgba(148,163,184,0.12)",
  darkText: "#94A3B8",
};

function statusStyle(status: string) {
  return STATUS_STYLES[status.toUpperCase()] ?? FALLBACK_STYLE;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function AdminRecentRequests({ requests }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-700 p-5 shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-[#0B2D63] dark:text-blue-200">
          Recent Requests
        </h2>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {requests.length} total
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-[#0B2D63]/[0.06] dark:bg-blue-400/10">
            <Inbox size={18} className="text-[#0B2D63] dark:text-blue-300" />
          </div>
          <p className="text-sm text-slate-400 dark:text-slate-500">No requests yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-gray-700">
          {requests.map((request) => {
            const style = statusStyle(request.status);

            return (
              <div
                key={request.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold bg-[#0B2D63]/[0.08] text-[#0B2D63] dark:bg-blue-400/10 dark:text-blue-300">
                    {initials(request.studentName)}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-slate-700 dark:text-slate-200 truncate">
                      {request.studentName}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {request.procedureName}
                    </p>
                  </div>
                </div>

                {/* Status badge — uses CSS custom properties to toggle light/dark inline styles */}
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ml-3 light-badge dark:hidden"
                  style={{ background: style.bg, color: style.text }}
                >
                  {request.status}
                </span>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ml-3 hidden dark:inline-flex"
                  style={{ background: style.darkBg, color: style.darkText }}
                >
                  {request.status}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminRecentRequests;