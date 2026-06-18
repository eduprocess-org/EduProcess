import type { AdminRequest } from "../../services/admin/requests/requestManagement.service";
import RequestStatusBadge from "./RequestStatusBadge";

interface Props {
  request: AdminRequest;
  isEven: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
}

const navy   = "#1B2B5E";
const blue   = "#2563EB";
const border = "#E4EAF4";
const muted  = "#64748B";
const subtle = "#94A3B8";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

const avatarColors = [
  { bg: "#DBEAFE", color: "#1D4ED8" },
  { bg: "#DCFCE7", color: "#15803D" },
  { bg: "#FEF3C7", color: "#B45309" },
  { bg: "#F3E8FF", color: "#7E22CE" },
  { bg: "#FCE7F3", color: "#BE185D" },
];

function avatarColor(name: string) {
  const idx = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[idx];
}

export default function RequestTableRow({
  request,
  isEven,
  selected,
  onSelect,
}: Props) {
  const av = avatarColor(request.studentName);

  return (
    <tr
      style={{
        borderBottom: `0.5px solid ${border}`,
        backgroundColor: isEven ? "#FFFFFF" : "#FAFBFD",
        transition: "background-color .15s",
      }}
      onMouseEnter={(e) => {
        const row = e.currentTarget;
        row.style.backgroundColor = "#F0F6FF";
        const accent = row.querySelector(".row-accent") as HTMLElement | null;
        if (accent) accent.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        const row = e.currentTarget;
        row.style.backgroundColor = isEven ? "#FFFFFF" : "#FAFBFD";
        const accent = row.querySelector(".row-accent") as HTMLElement | null;
        if (accent) accent.style.opacity = "0";
      }}
    >
      {/* Checkbox */}
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(request.id)}
        />
      </td>

      {/* Request ID */}
      <td
        className="px-5 py-3.5"
        style={{ position: "relative", paddingLeft: "1.5rem" }}
      >
        <div
          className="row-accent"
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 3,
            height: "60%",
            borderRadius: 4,
            backgroundColor: blue,
            opacity: 0,
            transition: "opacity .15s",
          }}
        />
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#EFF6FF",
            color: "#1D4ED8",
            fontFamily: "ui-monospace, monospace",
            fontSize: ".72rem",
            fontWeight: 600,
            letterSpacing: ".04em",
            padding: "2px 8px",
            borderRadius: 6,
          }}
        >
          {request.id}
        </span>
      </td>

      {/* Student */}
      <td className="px-5 py-3.5">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: av.bg,
              color: av.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 500,
              fontSize: ".7rem",
              flexShrink: 0,
            }}
          >
            {initials(request.studentName)}
          </div>
          <span style={{ color: navy, fontWeight: 500, fontSize: ".875rem" }}>
            {request.studentName}
          </span>
        </div>
      </td>

      {/* Email */}
      <td className="px-5 py-3.5">
        <span style={{ fontSize: ".8rem", color: muted }}>
          {request.studentEmail}
        </span>
      </td>

      {/* Procedure */}
      <td className="px-5 py-3.5">
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            color: muted,
            fontSize: ".8rem",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke={subtle}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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

      {/* Submitted */}
      <td className="px-5 py-3.5">
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <span
            style={{
              fontSize: ".8rem",
              fontWeight: 500,
              color: navy,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {new Date(request.submittedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span style={{ fontSize: ".7rem", color: subtle }}>
            {new Date(request.submittedAt).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-5 py-3.5">
        <button
          type="button"
          style={{
            padding: "5px 14px",
            borderRadius: 7,
            border: "0.5px solid #D9E3F0",
            background: "#ffffff",
            fontSize: ".75rem",
            fontWeight: 500,
            color: navy,
            cursor: "pointer",
            transition: "background .12s, border-color .12s, color .12s",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget;
            btn.style.background = "#EFF6FF";
            btn.style.borderColor = "#BFDBFE";
            btn.style.color = blue;
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget;
            btn.style.background = "#ffffff";
            btn.style.borderColor = "#D9E3F0";
            btn.style.color = navy;
          }}
        >
          View
        </button>
      </td>
    </tr>
  );
}