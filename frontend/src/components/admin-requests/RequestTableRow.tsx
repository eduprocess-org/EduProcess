import type { CSSProperties } from "react";
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

  const avatarVars = {
    "--avatar-bg":         av.bg,
    "--avatar-color":      av.color,
    "--avatar-dark-bg":    av.darkBg,
    "--avatar-dark-color": av.darkColor,
  } as CSSProperties;

  const rowBg = selected
    ? "bg-[#F0F6FF] dark:bg-blue-500/10"
    : isEven
    ? "bg-white dark:bg-gray-900"
    : "bg-[#FAFBFD] dark:bg-gray-800/50";

  return (
    <tr className={`group border-b border-[#E4EAF4] dark:border-gray-700 transition-colors duration-150 hover:bg-[#F0F6FF] dark:hover:bg-blue-900/20 ${rowBg}`}>

      {/* Checkbox */}
      <td className="px-3 py-3">
        <input
          type="checkbox"
          className="accent-[#1B2B5E] dark:accent-blue-400"
          checked={selected}
          onChange={() => onSelect(request.id)}
        />
      </td>

      {/* Request ID */}
      <td className="relative px-3 py-3" style={{ paddingLeft: "1rem" }}>
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-[4px] h-[60%] bg-[#2563EB] dark:bg-blue-400 transition-opacity ${selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
        <span className="inline-block bg-[#EFF6FF] dark:bg-blue-500/20 text-[#1D4ED8] dark:text-blue-200 font-mono text-[.72rem] font-semibold tracking-[.04em] px-2 py-0.5 rounded-md max-w-[120px] truncate align-middle">
          {request.id}
        </span>
      </td>

      {/* Student */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <div
            className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full text-[.68rem] font-semibold"
            style={{
              backgroundColor: av.bg,
              color: av.color,
            }}
          >
            <span className="dark:hidden">{initials(request.studentName)}</span>
            <span
              className="hidden dark:flex items-center justify-center w-full h-full rounded-full"
              style={{ backgroundColor: av.darkBg, color: av.darkColor }}
            >
              {initials(request.studentName)}
            </span>
          </div>
          <span className="max-w-[120px] truncate text-sm font-medium text-[#1B2B5E] dark:text-slate-200">
            {request.studentName}
          </span>
        </div>
      </td>

      {/* Email */}
      <td className="px-3 py-3">
        <span className="block max-w-[160px] truncate text-[.8rem] text-[#64748B] dark:text-slate-400">
          {request.studentEmail}
        </span>
      </td>

      {/* Procedure */}
      <td className="px-3 py-3">
        <span className="flex max-w-[160px] items-center gap-1.5 text-[.8rem] text-[#64748B] dark:text-slate-400">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="shrink-0 text-[#94A3B8] dark:text-slate-500" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="truncate">{request.procedureName}</span>
        </span>
      </td>

      {/* Status */}
      <td className="px-3 py-3">
        <RequestStatusBadge status={request.status} />
      </td>

      {/* Date */}
      <td className="px-3 py-3">
        <div className="flex flex-col gap-px">
          <span className="text-[.8rem] font-medium text-[#1B2B5E] dark:text-slate-200 tabular-nums whitespace-nowrap">
            {new Date(request.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </span>
          <span className="text-[.7rem] text-[#94A3B8] dark:text-slate-500 whitespace-nowrap">
            {new Date(request.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </td>

      {/* Action */}
      <td className="px-3 py-3 text-center">
        <button
          type="button"
          onClick={onView}
          className="rounded-lg border border-[#7c9fcc] bg-[#3065a1] px-3 py-1.5 text-xs font-medium text-white transition-all hover:border-[#1f4e7a] hover:bg-[#1f4e7a] dark:border-blue-600 dark:bg-blue-700 dark:hover:border-blue-500 dark:hover:bg-blue-600 whitespace-nowrap"
        >
          View
        </button>
      </td>
    </tr>
  );
}