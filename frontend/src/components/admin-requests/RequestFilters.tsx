import React from "react";
import { useProcedureTypes } from "../../hooks/admin/useProcedureTypes";

interface Props {
  search: string;
  status: string;
  procedure: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onProcedureChange: (value: string) => void;
}

const navy      = "#1B2B5E";
const blue      = "#2563EB";
const borderClr = "#D9E3F0";
const bgInput   = "#F8FAFC";
const textMuted = "#64748B";

const baseInputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: "0.75rem",
  border: `1.5px solid ${borderClr}`,
  backgroundColor: bgInput,
  padding: "0.55rem 0.875rem",
  fontSize: "0.875rem",
  color: navy,
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

const focusStyle: React.CSSProperties = {
  borderColor: blue,
  boxShadow: `0 0 0 3px #DBEAFE`,
  backgroundColor: "#ffffff",
};

function FocusInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    extraStyle?: React.CSSProperties;
  }
) {
  const [focused, setFocused] = React.useState(false);
  const { extraStyle, ...rest } = props;
  return (
    <input
      {...rest}
      style={{
        ...baseInputStyle,
        ...extraStyle,
        ...(focused ? focusStyle : {}),
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function FocusSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  const [focused, setFocused] = React.useState(false);
  return (
    <select
      {...props}
      style={{
        ...baseInputStyle,
        appearance: "none",
        WebkitAppearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.75rem center",
        paddingRight: "2.25rem",
        cursor: "pointer",
        ...(focused ? focusStyle : {}),
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

export default function RequestFilters({
  search,
  status,
  procedure,
  onSearchChange,
  onStatusChange,
  onProcedureChange,
}: Props) {
  const { procedureTypes } = useProcedureTypes();

  return (
    <div className="grid gap-3 md:grid-cols-3">

      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
          style={{ color: textMuted }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>

        <FocusInput
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, ID, email…"
          extraStyle={{ paddingLeft: "2.25rem" }}
        />
      </div>

      <FocusSelect
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in_review">In Review</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </FocusSelect>

      <FocusSelect
        value={procedure}
        onChange={(e) => onProcedureChange(e.target.value)}
      >
        <option value="">All Procedures</option>
        {procedureTypes.map((pt) => (
          <option key={pt.id} value={pt.id}>
            {pt.name}
          </option>
        ))}
      </FocusSelect>

    </div>
  );
}
