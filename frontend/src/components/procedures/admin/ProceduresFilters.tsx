import { ChevronDown } from "lucide-react";
import type { ProcedureStatus } from "../../../types/admin/procedures/procedures.types";

interface Props {
  status: "ALL" | ProcedureStatus;
  onStatusChange: (value: "ALL" | ProcedureStatus) => void;
  sortOrder: "asc" | "desc";
  onSortChange: (value: "asc" | "desc") => void;
}

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

const selectClass = `
  appearance-none
  h-10
  rounded-lg
  border
  border-slate-200
  bg-white
  pl-3
  pr-8
  text-sm
  font-medium
  text-slate-700
  shadow-sm
  outline-none
  transition
  hover:border-slate-300
  focus:border-indigo-500
  focus:ring-2
  focus:ring-indigo-100
  dark:border-slate-700
  dark:bg-slate-900
  dark:text-slate-200
  dark:hover:border-slate-600
  dark:focus:border-indigo-500
  dark:focus:ring-indigo-900/40
  cursor-pointer
`;

function ProceduresFilters({
  status,
  onStatusChange,
  sortOrder,
  onSortChange,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">

      <SelectWrapper>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as "ALL" | ProcedureStatus)}
          className={selectClass}
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="DRAFT">Draft</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </SelectWrapper>

      <SelectWrapper>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
          className={selectClass}
        >
          <option value="asc">Name (A → Z)</option>
          <option value="desc">Name (Z → A)</option>
        </select>
      </SelectWrapper>

    </div>
  );
}

export default ProceduresFilters;