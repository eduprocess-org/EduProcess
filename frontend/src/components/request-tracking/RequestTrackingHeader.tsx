import { Calendar, RefreshCw, ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

interface Props {
  procedureName: string;
  status: string;
  submissionDate: string;
  lastUpdateDate: string;
}

function RequestTrackingHeader({
  procedureName,
  status,
  submissionDate,
  lastUpdateDate,
}: Props) {
  return (
    <>
      <Link
        to="/"
        className="
          inline-flex items-center gap-2
          text-sm font-medium text-slate-500
          hover:text-slate-800 transition-colors
        "
      >
        <ArrowLeft size={15} />
        Back to Dashboard
      </Link>

      <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        {/* Top accent */}
        <div className="h-[3px] w-full bg-[#0B2D63]" />

        <div className="p-6">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FA] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0B2D63]">
            <FileText size={11} />
            Request Tracking
          </div>

          {/* Title + status */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-xl font-semibold text-slate-900 leading-snug">
              {procedureName}
            </h1>
            <StatusBadge status={status} />
          </div>

          {/* Dates */}
          <div className="mt-5 pt-4 border-t border-slate-100 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FA] text-[#0B2D63]">
                <Calendar size={14} />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Submission Date
                </p>
                <p className="text-sm font-medium text-slate-800">
                  {submissionDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#E1F5EE] text-[#0F6E56]">
                <RefreshCw size={14} />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Last Update
                </p>
                <p className="text-sm font-medium text-slate-800">
                  {lastUpdateDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RequestTrackingHeader;
