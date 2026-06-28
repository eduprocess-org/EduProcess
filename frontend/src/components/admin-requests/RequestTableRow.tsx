import type { AdminRequestListItem } from "../../types/admin/adminRequest.types";
import RequestStatusBadge from "./RequestStatusBadge";

interface Props {
  request: AdminRequestListItem;
  isEven: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
  onView: () => void;
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]?.toUpperCase() ?? "").join("");
}

const avatarColors = [
  { bg: "#DBEAFE", color: "#1D4ED8", darkBg: "rgba(59,130,246,0.20)",  darkColor: "#93C5FD" },
  { bg: "#DCFCE7", color: "#15803D", darkBg: "rgba(34,197,94,0.18)",   darkColor: "#86EFAC" },
  { bg: "#FEF3C7", color: "#B45309", darkBg: "rgba(234,179,8,0.18)",   darkColor: "#FDE047" },
  { bg: "#F3E8FF", color: "#7E22CE", darkBg: "rgba(168,85,247,0.18)",  darkColor: "#D8B4FE" },
  { bg: "#FCE7F3", color: "#BE185D", darkBg: "rgba(236,72,153,0.18)",  darkColor: "#F9A8D4" },
];

function avatarColor(name: string) {
  return avatarColors[name.charCodeAt(0) % avatarColors.length];
}

export default function RequestTableRow({ request, isEven, selected, onSelect, onView }: Props) {
  const av = avatarColor(request.studentName);

  return (
    <tr
      className={`group border-b border-[#E4EAF4] dark:border-gray-700 transition-colors duration-150
        hover:bg-[#F0F6FF] dark:hover:bg-blue-900/20
        ${selected
          ? "bg-[#F0F6FF] dark:bg-blue-900/20"
          : isEven
          ? "bg-white dark:bg-gray-900"
          : "bg-[#FAFBFD] dark:bg-gray-800/50"
        }`}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          className="accent-[#1B2B5E] dark:accent-blue-400"
          checked={selected}
          onChange={() => onSelect(request.id)}
        />
      </td>

      {/* Request ID */}
      <td className="relative px-5 py-3.5" style={{ paddingLeft: "1.5rem" }}>
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-[4px] h-[60%] bg-[#2563EB] dark:bg-blue-400 transition-opacity
            ${selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
        />
        <span className="inline-block bg-[#EFF6FF] dark:bg-blue-900/40 text-[#1D4ED8] dark:text-blue-300 font-mono text-[.72rem] font-semibold tracking-[.04em] px-2 py-0.5 rounded-md">
          {request.id}
        </span>
      </td>

      {/* Student */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-[30px] h-[30px] rounded-full flex items-center justify-center font-medium text-[.7rem] shrink-0 dark:hidden"
            style={{ backgroundColor: av.bg, color: av.color }}
          >
            {initials(request.studentName)}
          </div>
          <div
            className="w-[30px] h-[30px] rounded-full items-center justify-center font-medium text-[.7rem] shrink-0 hidden dark:flex"
            style={{ backgroundColor: av.darkBg, color: av.darkColor }}
          >
            {initials(request.studentName)}
          </div>
          <span className="text-[#1B2B5E] dark:text-slate-200 font-medium text-sm">
            {request.studentName}
          </span>
        </div>
      </td>

      {/* Email */}
      <td className="px-5 py-3.5">
        <span className="text-[.8rem] text-[#64748B] dark:text-slate-400">
          {request.studentEmail}
        </span>
      </td>

      {/* Procedure */}
      <td className="px-5 py-3.5">
        <span className="flex items-center gap-[5px] text-[#64748B] dark:text-slate-400 text-[.8rem]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            className="text-[#94A3B8] dark:text-slate-500" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          {request.procedureName}
        </span>
      </td>

      {/* Status */}
      <td className="px-5 py-3.5">
        <RequestStatusBadge status={request.status} />
      </td>

      {/* Date */}
      <td className="px-5 py-3.5">
        <div className="flex flex-col gap-px">
          <span className="text-[.8rem] font-medium text-[#1B2B5E] dark:text-slate-200 tabular-nums">
            {new Date(request.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
          <span className="text-[.7rem] text-[#94A3B8] dark:text-slate-500">
            {new Date(request.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </td>

      {/* Action */}
      <td className="px-5 py-3.5">
        <button
          type="button"
          onClick={onView}
          className="px-[14px] py-[5px] rounded-[7px] text-[.75rem] font-medium text-white cursor-pointer transition-all
            bg-[#3065a1] border border-[#7c9fcc]
            hover:bg-[#1f4e7a] hover:border-[#1f4e7a]
            dark:bg-blue-700 dark:border-blue-600
            dark:hover:bg-blue-600 dark:hover:border-blue-500"
        >
          View
        </button>
      </td>
    </tr>
  );
}