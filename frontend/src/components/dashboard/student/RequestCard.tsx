import { useNavigate } from "react-router-dom";
import { Eye, MapPin, Calendar, FileText, FileCheck, Receipt, GraduationCap } from "lucide-react";
import type { StudentRequest } from "../../../types/student/studentRequest.types";

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
    // dark variants
    darkPillBg: string;
    darkPillBorder: string;
    darkPillText: string;
    darkIconBg: string;
    darkIconColor: string;
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
    darkPillBg: "dark:bg-yellow-900/30",
    darkPillBorder: "dark:border-yellow-700/50",
    darkPillText: "dark:text-yellow-300",
    darkIconBg: "dark:bg-yellow-900/30",
    darkIconColor: "dark:text-yellow-300",
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
    darkPillBg: "dark:bg-emerald-900/30",
    darkPillBorder: "dark:border-emerald-700/50",
    darkPillText: "dark:text-emerald-300",
    darkIconBg: "dark:bg-emerald-900/30",
    darkIconColor: "dark:text-emerald-300",
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
    darkPillBg: "dark:bg-red-900/30",
    darkPillBorder: "dark:border-red-700/50",
    darkPillText: "dark:text-red-300",
    darkIconBg: "dark:bg-red-900/30",
    darkIconColor: "dark:text-red-300",
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
  darkPillBg: "dark:bg-slate-700/30",
  darkPillBorder: "dark:border-slate-600",
  darkPillText: "dark:text-slate-300",
  darkIconBg: "dark:bg-slate-700/30",
  darkIconColor: "dark:text-slate-300",
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
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-slate-200 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600 sm:flex-row sm:items-center">

      {/* Parte izquierda */}
      <div className="flex min-w-0 flex-1 items-start gap-3">

        <div className={`mt-1 h-10 w-[3px] flex-shrink-0 rounded-full ${s.barColor}`} />

        <div
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${s.iconBg} ${s.iconColor} ${s.darkIconBg} ${s.darkIconColor}`}
        >
          <ProcedureIcon size={16} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
            {request.procedureName}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${s.pillBg} ${s.pillBorder} ${s.pillText} ${s.darkPillBg} ${s.darkPillBorder} ${s.darkPillText}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${s.dotColor}`} />
              {s.label}
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
              <Calendar size={11} />
              {request.createdAt}
            </span>
          </div>
        </div>

      </div>

      {/* Botones */}
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">

        <button
          onClick={() => navigate(`/requests/${request.id}/tracking`)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-gray-600 dark:bg-gray-800 dark:text-slate-300 dark:hover:bg-gray-700 sm:w-auto"
        >
          <MapPin size={13} />
          Track
        </button>

        <button
          onClick={() => navigate(`/procedures/${request.procedureId}`)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2D63] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#09224E] dark:bg-blue-700 dark:hover:bg-blue-600 sm:w-auto"
        >
          <Eye size={13} />
          View
        </button>

      </div>

    </div>
  );
}

export default RequestCard;