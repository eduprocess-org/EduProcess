import type { AdminRequestListItem } from "../../types/admin/adminRequest.types";

interface Props {
  status: AdminRequestListItem["status"];
}

const styles: Record<
  AdminRequestListItem["status"],
  { bg: string; color: string; border: string; dot: string; label: string }
> = {
  pending: {
    bg: "#FFFBEB",
    color: "#92400E",
    border: "#FDE68A",
    dot: "#F59E0B",
    label: "Pending",
  },
  in_review: {
    bg: "#EFF6FF",
    color: "#1E40AF",
    border: "#BFDBFE",
    dot: "#3B82F6",
    label: "In Review",
  },
  approved: {
    bg: "#F0FDF4",
    color: "#166534",
    border: "#BBF7D0",
    dot: "#22C55E",
    label: "Approved",
  },
  rejected: {
    bg: "#FFF1F2",
    color: "#9F1239",
    border: "#FECDD3",
    dot: "#F43F5E",
    label: "Rejected",
  },
};

export default function RequestStatusBadge({ status }: Props) {
  const s = styles[status] || {
    bg: "#F1F5F9",
    color: "#475569",
    border: "#E2E8F0",
    dot: "#94A3B8",
    label: status,
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        backgroundColor: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        borderRadius: 99,
        padding: "3px 10px 3px 8px",
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
        {(status === "pending" || status === "in_review") && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              backgroundColor: s.dot,
              opacity: 0.4,
              animation: "ping 1.4s cubic-bezier(0,0,0.2,1) infinite",
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
          }}
        />
      </span>

      {s.label}

      {/* Keyframe injected once */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </span>
  );
}