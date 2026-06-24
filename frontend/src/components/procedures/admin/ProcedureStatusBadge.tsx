import type { ProcedureStatus } from "../../../types/admin/procedures/procedures.types";

interface Props {
  status: ProcedureStatus;
}

const config: Record<
  ProcedureStatus,
  { label: string; dot: string; pill: string }
> = {
  ACTIVE: {
    label: "Active",
    dot: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800",
  },
  DRAFT: {
    label: "Draft",
    dot: "bg-amber-400",
    pill: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-800",
  },
  INACTIVE: {
    label: "Inactive",
    dot: "bg-slate-400",
    pill: "bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700",
  },
};

function ProcedureStatusBadge({ status }: Props) {
  const { label, dot, pill } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

export default ProcedureStatusBadge;