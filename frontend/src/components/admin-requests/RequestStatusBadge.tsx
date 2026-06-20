import type { AdminRequestListItem } from "../../types/admin/adminRequest.types";

interface Props {
  status: AdminRequestListItem["status"];
}

const styles: Record<
  AdminRequestListItem["status"],
  { bg: string; color: string; border: string; dot: string; label: string }
> = {
  PENDING: {
    bg: "#FFFBEB",
    color: "#B45309",
    border: "#FDE68A",
    dot: "#F59E0B",
    label: "Pending",
  },
  IN_REVIEW: {
    bg: "#EFF6FF",
    color: "#1D4ED8",
    border: "#BFDBFE",
    dot: "#3B82F6",
    label: "In Review",
  },
  APPROVED: {
    bg: "#ECFDF5",
    color: "#065F46",
    border: "#A7F3D0",
    dot: "#10B981",
    label: "Approved",
  },
  REJECTED: {
    bg: "#FFF1F2",
    color: "#9F1239",
    border: "#FECDD3",
    dot: "#F43F5E",
    label: "Rejected",
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
  const s = styles[status] ?? {
    bg: "#FFFBEB",
    color: "#B45309",
    border: "#FDE68A",
    dot: "#F59E0B",
    label: status,
  };

  const isPulsing = status === "PENDING" || status === "IN_REVIEW";

  return (
    <>
      <style>{PING_STYLE}</style>
      <span
        className="rsp-badge"
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
        {/* Dot with optional pulse */}
        <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7, flexShrink: 0 }}>
          {isPulsing && (
            <span
              className="rsp-ping"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                backgroundColor: s.dot,
                opacity: 0.45,
              }}
            />
          )}
          <span
            style={{
              position: "relative",
              display: "inline-block",
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: s.dot,
              boxShadow: `0 0 0 2px ${s.bg}`,
            }}
          />
        </span>

        {s.label}
      </span>
    </>
  );
}