import type { CSSProperties } from "react";
import type { AdminRequestListItem } from "../../types/admin/adminRequest.types";

interface Props {
  status: AdminRequestListItem["status"];
}

const styles: Record<
  string,
  {
    bg: string; color: string; border: string; dot: string; label: string;
    darkBg: string; darkColor: string; darkBorder: string; darkDot: string;
  }
> = {
  PENDING: {
    bg: "#FFFBEB", color: "#B45309", border: "#FDE68A", dot: "#F59E0B", label: "Pending",
    darkBg: "rgba(251,191,36,0.12)", darkColor: "#FCD34D", darkBorder: "rgba(251,191,36,0.30)", darkDot: "#FBBF24",
  },
  IN_REVIEW: {
    bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE", dot: "#3B82F6", label: "In Review",
    darkBg: "rgba(59,130,246,0.12)", darkColor: "#93C5FD", darkBorder: "rgba(59,130,246,0.30)", darkDot: "#60A5FA",
  },
  APPROVED: {
    bg: "#ECFDF5", color: "#065F46", border: "#A7F3D0", dot: "#10B981", label: "Approved",
    darkBg: "rgba(16,185,129,0.12)", darkColor: "#6EE7B7", darkBorder: "rgba(16,185,129,0.30)", darkDot: "#34D399",
  },
  REJECTED: {
    bg: "#FFF1F2", color: "#9F1239", border: "#FECDD3", dot: "#F43F5E", label: "Rejected",
    darkBg: "rgba(244,63,94,0.12)", darkColor: "#FDA4AF", darkBorder: "rgba(244,63,94,0.30)", darkDot: "#FB7185",
  },
};

const BADGE_STYLE = `
  @keyframes rsp-ping {
    75%, 100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes rsp-fadein {
    from { opacity: 0; transform: scale(.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  .rsp-badge {
    background-color: var(--rsp-bg);
    color: var(--rsp-color);
    border: 1px solid var(--rsp-border);
    animation: rsp-fadein .2s ease both;
    transition: box-shadow .15s, transform .15s, background-color .15s, color .15s, border-color .15s;
  }
  .rsp-badge:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,.10);
  }
  .rsp-dot {
    background-color: var(--rsp-dot);
    box-shadow: 0 0 0 2px var(--rsp-bg);
  }
  .rsp-ping {
    background-color: var(--rsp-dot);
    opacity: .45;
    animation: rsp-ping 1.5s cubic-bezier(0,0,.2,1) infinite;
  }
  .dark .rsp-badge {
    background-color: var(--rsp-dark-bg);
    color: var(--rsp-dark-color);
    border-color: var(--rsp-dark-border);
  }
  .dark .rsp-dot {
    background-color: var(--rsp-dark-dot);
    box-shadow: 0 0 0 2px var(--rsp-dark-bg);
  }
  .dark .rsp-ping {
    background-color: var(--rsp-dark-dot);
  }
`;

export default function RequestStatusBadge({ status }: Props) {
  const normalizedStatus = status.toUpperCase();

  const s = styles[normalizedStatus] ?? {
    bg: "#F3F4F6", color: "#374151", border: "#D1D5DB", dot: "#9CA3AF",
    label: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
    darkBg: "rgba(148,163,184,0.12)", darkColor: "#CBD5E1", darkBorder: "rgba(148,163,184,0.30)", darkDot: "#94A3B8",
  };

  const isPulsing = normalizedStatus === "PENDING" || normalizedStatus === "IN_REVIEW";

  const badgeVars = {
    "--rsp-bg": s.bg,
    "--rsp-color": s.color,
    "--rsp-border": s.border,
    "--rsp-dot": s.dot,
    "--rsp-dark-bg": s.darkBg,
    "--rsp-dark-color": s.darkColor,
    "--rsp-dark-border": s.darkBorder,
    "--rsp-dark-dot": s.darkDot,
  } as CSSProperties;

  return (
    <>
      <style>{BADGE_STYLE}</style>
      <span
        className="rsp-badge inline-flex items-center gap-1.5 rounded-full py-[3px] pl-2 pr-2.5 text-[0.68rem] font-bold tracking-wide whitespace-nowrap select-none"
        style={badgeVars}
      >
        <span className="relative inline-flex h-[7px] w-[7px] flex-shrink-0">
          {isPulsing && <span className="rsp-ping absolute inset-0 rounded-full" />}
          <span className="rsp-dot relative inline-block h-[7px] w-[7px] rounded-full" />
        </span>
        {s.label}
      </span>
    </>
  );
}