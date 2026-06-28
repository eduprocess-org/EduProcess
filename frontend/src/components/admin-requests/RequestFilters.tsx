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

const inputBase = `
  w-full rounded-xl border border-[#D9E3F0] dark:border-gray-600
  bg-[#F8FAFC] dark:bg-gray-800
  text-[#1B2B5E] dark:text-slate-200
  placeholder:text-[#94A3B8] dark:placeholder:text-slate-500
  px-3.5 py-[0.55rem] text-sm
  outline-none
  [color-scheme:light] dark:[color-scheme:dark]
  transition-[border-color,box-shadow,background-color]
  focus:border-[#2563EB] dark:focus:border-blue-400
  focus:shadow-[0_0_0_3px_#DBEAFE] dark:focus:shadow-[0_0_0_3px_rgba(96,165,250,0.15)]
  focus:bg-white dark:focus:bg-gray-700
`;

function FocusInput(props: React.InputHTMLAttributes<HTMLInputElement> & { extraClass?: string }) {
  const { extraClass, className, ...rest } = props;
  return <input {...rest} className={`${inputBase} ${extraClass ?? ""} ${className ?? ""}`} />;
}

function FocusSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className, ...rest } = props;
  return (
    <select
      {...rest}
      className={`
        ${inputBase}
        appearance-none cursor-pointer pr-9
        bg-[image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")]
        bg-no-repeat bg-[right_0.75rem_center]
        ${className ?? ""}
      `}
    />
  );
}

export default function RequestFilters({
  search, status, procedure,
  onSearchChange, onStatusChange, onProcedureChange,
}: Props) {
  const { procedureTypes } = useProcedureTypes();

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B] dark:text-slate-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
        <FocusInput
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, ID, email…"
          extraClass="pl-9"
        />
      </div>

      <FocusSelect value={status} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in_review">In Review</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </FocusSelect>

      <FocusSelect value={procedure} onChange={(e) => onProcedureChange(e.target.value)}>
        <option value="">All Procedures</option>
        {procedureTypes.map((pt) => (
          <option key={pt.id} value={pt.id}>{pt.name}</option>
        ))}
      </FocusSelect>
    </div>
  );
}