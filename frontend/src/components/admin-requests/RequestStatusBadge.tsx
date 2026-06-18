interface Props {
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const styles = {
  PENDING: {
    bg: "#FEF3C7",
    color: "#92400E",
    label: "Pending",
  },
  APPROVED: {
    bg: "#DCFCE7",
    color: "#166534",
    label: "Approved",
  },
  REJECTED: {
    bg: "#FEE2E2",
    color: "#991B1B",
    label: "Rejected",
  },
};

export default function RequestStatusBadge({
  status,
}: Props) {
  const s = styles[status];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: s.bg,
        color: s.color,
        borderRadius: 99,
        padding: "3px 10px",
        fontSize: "0.7rem",
        fontWeight: 500,
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}