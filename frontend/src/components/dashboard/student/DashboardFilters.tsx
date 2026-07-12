import { Filter, ArrowUpDown } from "lucide-react";

interface Props {
  status: string;
  setStatus: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

function DashboardFilters({ status, setStatus, sort, setSort }: Props) {
  const selectClass = `
    w-full appearance-none rounded-xl
    border border-slate-200 dark:border-gray-600
    bg-white dark:bg-gray-800
    py-2.5 pl-9 pr-4
    text-sm font-medium
    text-slate-700 dark:text-slate-200
    outline-none transition
    focus:border-[#0B2D63] dark:focus:border-blue-400
    focus:ring-2 focus:ring-[#0B2D63]/10 dark:focus:ring-blue-400/10
    sm:w-auto
  `;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">

      {/* Status filter */}
      <div className="relative flex items-center">
        <Filter size={14} className="pointer-events-none absolute left-3 text-slate-400 dark:text-slate-500" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* Sort */}
      <div className="relative flex items-center">
        <ArrowUpDown size={14} className="pointer-events-none absolute left-3 text-slate-400 dark:text-slate-500" />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
          <option value="NEWEST">Newest First</option>
          <option value="OLDEST">Oldest First</option>
        </select>
      </div>

    </div>
  );
}

export default DashboardFilters;