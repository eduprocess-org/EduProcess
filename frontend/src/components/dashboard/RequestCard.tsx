import { useNavigate } from "react-router-dom";
import { Eye, MapPin, Calendar, FileText, FileCheck, Receipt, GraduationCap } from "lucide-react";
import type { StudentRequest } from "../../types/studentRequest.types";

interface Props {
  request: StudentRequest;
}

const statusConfig: Record<
  string,
  {
    label: string;
    barColor: string;
    dotColor: string;
    pillBg: string;
    pillBorder: string;
    pillText: string;
    iconBg: string;
    iconColor: string;
  }
> = {
  PENDING: {
    label: "Pending",
    barColor: "bg-[#EF9F27]",
    dotColor: "bg-[#EF9F27]",
    pillBg: "bg-[#FAEEDA]",
    pillBorder: "border-[#FAC775]",
    pillText: "text-[#854F0B]",
    iconBg: "bg-[#FAEEDA]",
    iconColor: "text-[#854F0B]",
  },
  APPROVED: {
    label: "Approved",
    barColor: "bg-[#1D9E75]",
    dotColor: "bg-[#1D9E75]",
    pillBg: "bg-[#E1F5EE]",
    pillBorder: "border-[#9FE1CB]",
    pillText: "text-[#0F6E56]",
    iconBg: "bg-[#E1F5EE]",
    iconColor: "text-[#0F6E56]",
  },
  REJECTED: {
    label: "Rejected",
    barColor: "bg-[#E24B4A]",
    dotColor: "bg-[#E24B4A]",
    pillBg: "bg-[#FCEBEB]",
    pillBorder: "border-[#F7C1C1]",
    pillText: "text-[#A32D2D]",
    iconBg: "bg-[#FCEBEB]",
    iconColor: "text-[#A32D2D]",
  },
};

const fallbackStatus = {
  label: "Unknown",
  barColor: "bg-slate-300",
  dotColor: "bg-slate-400",
  pillBg: "bg-slate-50",
  pillBorder: "border-slate-200",
  pillText: "text-slate-600",
  iconBg: "bg-slate-100",
  iconColor: "text-slate-500",
};

function getProcedureIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("enrollment")) return FileCheck;
  if (lower.includes("tuition") || lower.includes("payment")) return Receipt;
  if (lower.includes("grade") || lower.includes("academic")) return GraduationCap;
  return FileText;
}

function RequestCard({ request }: Props) {
  const navigate = useNavigate();
  const s = statusConfig[request.status] ?? fallbackStatus;
  const ProcedureIcon = getProcedureIcon(request.procedureName);

  return (
    <div
      className="
        flex items-center gap-3
        rounded-2xl border border-slate-100
        bg-white px-4 py-3.5 shadow-sm
        transition hover:border-slate-200
      "
    >
      {/* Status bar */}
      <div className={`h-10 w-[3px] flex-shrink-0 rounded-full ${s.barColor}`} />

      {/* Procedure icon */}
      <div
        className={`
          flex h-9 w-9 flex-shrink-0 items-center justify-center
          rounded-xl ${s.iconBg} ${s.iconColor}
        `}
      >
        <ProcedureIcon size={16} />
      </div>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-sm font-medium text-slate-900">
          {request.procedureName}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`
              inline-flex items-center gap-1.5 rounded-full border
              px-2.5 py-0.5 text-[11px] font-medium
              ${s.pillBg} ${s.pillBorder} ${s.pillText}
            `}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${s.dotColor}`} />
            {s.label}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
            <Calendar size={11} />
            {request.createdAt}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-shrink-0 items-center gap-2">
        <button
          onClick={() => navigate(`/requests/${request.id}/tracking`)}
          className="
            inline-flex items-center gap-1.5
            rounded-xl border border-slate-200 bg-white
            px-3 py-1.5 text-xs font-medium text-slate-500
            transition hover:border-slate-300 hover:bg-slate-50
            active:scale-[0.98]
          "
        >
          <MapPin size={12} />
          Track
        </button>

        <button
          onClick={() => navigate(`/requests/${request.id}`)}
          className="
            inline-flex items-center gap-1.5
            rounded-xl bg-[#0B2D63]
            px-3 py-1.5 text-xs font-medium text-white
            transition hover:bg-[#09224E]
            active:scale-[0.98]
          "
        >
          <Eye size={12} />
          View
        </button>
      </div>
    </div>
  );
}

export default RequestCard;
