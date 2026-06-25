interface Props {
  isActive: boolean;
}

function ProcedureStatusBadge({ isActive }: Props) {
  const { label, dot, pill } = isActive
    ? {
        label: "Active",
        dot: "bg-emerald-500",
        pill: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800",
      }
    : {
        label: "Inactive",
        dot: "bg-slate-400",
        pill: "bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700",
      };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

export default ProcedureStatusBadge;
