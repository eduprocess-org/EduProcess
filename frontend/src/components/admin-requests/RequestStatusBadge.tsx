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
    bg: "#FFFBEB",     color: "#B45309",  border: "#FDE68A",  dot: "#F59E0B", label: "Pending",
    darkBg: "rgba(251,191,36,0.12)", darkColor: "#FCD34D", darkBorder: "rgba(251,191,36,0.30)", darkDot: "#FBBF24",
  },
  IN_REVIEW: {
    bg: "#EFF6FF",     color: "#1D4ED8",  border: "#BFDBFE",  dot: "#3B82F6", label: "In Review",
    darkBg: "rgba(59,130,246,0.12)", darkColor: "#93C5FD", darkBorder: "rgba(59,130,246,0.30)", darkDot: "#60A5FA",
  },
  APPROVED: {
    bg: "#ECFDF5",     color: "#065F46",  border: "#A7F3D0",  dot: "#10B981", label: "Approved",
    darkBg: "rgba(16,185,129,0.12)", darkColor: "#6EE7B7", darkBorder: "rgba(16,185,129,0.30)", darkDot: "#34D399",
  },
  REJECTED: {
    bg: "#FFF1F2",     color: "#9F1239",  border: "#FECDD3",  dot: "#F43F5E", label: "Rejected",
    darkBg: "rgba(244,63,94,0.12)", darkColor: "#FDA4AF", darkBorder: "rgba(244,63,94,0.30)", darkDot: "#FB7185",
  },
};

const PING_STYLE = `
  @keyframes rsp-ping {
    75%, 100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes rsp-fadein {
    from { opacity: 0; transform: scale(.85); }
    to   { opacity: 1; transform: scale(1); }
  }
  .rsp-badge {
    animation: rsp-fadein .2s ease both;
    transition: box-shadow .15s, transform .15s;
  }
  .rsp-badge:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,.10);
  }
  .rsp-ping {
    animation: rsp-ping 1.5s cubic-bezier(0,0,.2,1) infinite;
  }
`;

export default function RequestStatusBadge({ status }: Props) {
  const normalizedStatus = status.toUpperCase();

  const s = styles[normalizedStatus] ?? {
    bg: "#F3F4F6",   color: "#374151",  border: "#D1D5DB",  dot: "#9CA3AF",
    label: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
    darkBg: "rgba(148,163,184,0.12)", darkColor: "#CBD5E1", darkBorder: "rgba(148,163,184,0.30)", darkDot: "#94A3B8",
  };

  const isPulsing = normalizedStatus === "PENDING" || normalizedStatus === "IN_REVIEW";

  return (
    <>
      <style>{PING_STYLE}</style>

      {/* Light badge */}
      <span
        className="rsp-badge dark:hidden"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          backgroundColor: s.bg,
          color: s.color,
          border: `1px solid ${s.border}`,
          borderRadius: 99,
          padding: "3px 10px 3px 8px",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7, flexShrink: 0 }}>
          {isPulsing && (
            <span className="rsp-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: s.dot, opacity: 0.45 }} />
          )}
          <span style={{ position: "relative", display: "inline-block", width: 7, height: 7, borderRadius: "50%", backgroundColor: s.dot, boxShadow: `0 0 0 2px ${s.bg}` }} />
        </span>
        {s.label}
      </span>

      {/* Dark badge */}
      <span
        className="rsp-badge hidden dark:inline-flex"
        style={{
          alignItems: "center",
          gap: 6,
          backgroundColor: s.darkBg,
          color: s.darkColor,
          border: `1px solid ${s.darkBorder}`,
          borderRadius: 99,
          padding: "3px 10px 3px 8px",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}
      >
        <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7, flexShrink: 0 }}>
          {isPulsing && (
            <span className="rsp-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: s.darkDot, opacity: 0.45 }} />
          )}
          <span style={{ position: "relative", display: "inline-block", width: 7, height: 7, borderRadius: "50%", backgroundColor: s.darkDot, boxShadow: `0 0 0 2px ${s.darkBg}` }} />
        </span>
        {s.label}
      </span>
    </>
  );
}