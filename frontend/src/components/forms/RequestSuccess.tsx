import { CheckCircle, Hash, FileText, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  requestId: string;
  procedureName: string;
}

function RequestSuccess({ requestId, procedureName }: Props) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
      {/* Top accent */}
      <div className="h-[3px] w-full bg-emerald-500" />

      <div className="flex flex-col items-center text-center px-8 py-10">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100">
          <CheckCircle size={32} className="text-emerald-500" />
        </div>

        <h2 className="mt-5 text-xl font-semibold text-slate-900">
          Request Submitted Successfully
        </h2>

        <p className="mt-2 text-sm text-slate-500 max-w-sm">
          Your procedure request has been received and is now pending review.
        </p>

        {/* Details card */}
        <div className="mt-7 w-full max-w-sm rounded-xl border border-slate-100 bg-slate-50 divide-y divide-slate-100 text-left overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FA] text-[#0B2D63]">
              <Hash size={13} />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Request ID
              </p>
              <p className="text-sm font-medium text-slate-800">
                {requestId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FA] text-[#0B2D63]">
              <FileText size={13} />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Procedure
              </p>
              <p className="text-sm font-medium text-slate-800">
                {procedureName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E1F5EE] text-[#0F6E56]">
              <Clock size={13} />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Status
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Pending Review
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/procedures")}
          className="
            mt-7 rounded-xl bg-[#0B2D63]
            px-6 py-2.5 text-sm font-medium text-white
            transition hover:bg-[#09224E] active:scale-[0.98]
          "
        >
          Back to Procedures
        </button>
      </div>
    </div>
  );
}

export default RequestSuccess;
