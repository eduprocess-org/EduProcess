import type {
  RecentRequest,
} from "../../../types/admin/adminDashboard.types";
import { Inbox } from "lucide-react";

interface Props {
  requests: RecentRequest[];
}

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  PENDING: { bg: "rgba(217,119,6,0.10)", text: "#B45309" },
  APPROVED: { bg: "rgba(22,163,74,0.10)", text: "#15803D" },
  REJECTED: { bg: "rgba(220,38,38,0.10)", text: "#B91C1C" },
};

function statusStyle(status: string) {
  return STATUS_STYLES[status.toUpperCase()] ?? { bg: "rgba(100,116,139,0.10)", text: "#475569" };
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function AdminRecentRequests({
  requests,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-[#0B2D63]">
          Recent Requests
        </h2>
        <span className="text-xs text-slate-400">
          {requests.length} total
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
            style={{ background: "rgba(11,45,99,0.06)" }}
          >
            <Inbox size={18} style={{ color: "#0B2D63" }} />
          </div>
          <p className="text-sm text-slate-400">No requests yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {requests.map((request) => {
            const style = statusStyle(request.status);

            return (
              <div
                key={request.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold"
                    style={{ background: "rgba(11,45,99,0.08)", color: "#0B2D63" }}
                  >
                    {initials(request.studentName)}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-slate-700 truncate">
                      {request.studentName}
                    </p>
                    <p className="text-sm text-slate-500 truncate">
                      {request.procedureName}
                    </p>
                  </div>
                </div>

                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ml-3"
                  style={{ background: style.bg, color: style.text }}
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