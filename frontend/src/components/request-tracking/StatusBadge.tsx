import { Clock, CheckCircle, XCircle, Send } from "lucide-react";

interface Props {
  status: string;
}

const config: Record<
  string,
  {
    icon: React.ElementType;
    light: string;
    dark: string;
  }
> = {
  Submitted: {
    icon: Send,
    light: "bg-[#EEF2FA] border-[#b8c9e8] text-[#0B2D63]",
    dark:  "dark:bg-blue-900/30 dark:border-blue-700/50 dark:text-blue-300",
  },
  "Under Review": {
    icon: Clock,
    light: "bg-[#FAEEDA] border-[#FAC775] text-[#854F0B]",
    dark:  "dark:bg-yellow-900/30 dark:border-yellow-700/50 dark:text-yellow-300",
  },
  Approved: {
    icon: CheckCircle,
    light: "bg-[#E1F5EE] border-[#9FE1CB] text-[#0F6E56]",
    dark:  "dark:bg-emerald-900/30 dark:border-emerald-700/50 dark:text-emerald-300",
  },
  Rejected: {
    icon: XCircle,
    light: "bg-[#FCEBEB] border-[#F7C1C1] text-[#A32D2D]",
    dark:  "dark:bg-red-900/30 dark:border-red-700/50 dark:text-red-300",
  },
};

const dotColor: Record<string, string> = {
  Submitted:    "bg-[#0B2D63] dark:bg-blue-400",
  "Under Review":"bg-[#EF9F27] dark:bg-yellow-400",
  Approved:     "bg-[#1D9E75] dark:bg-emerald-400",
  Rejected:     "bg-[#E24B4A] dark:bg-red-400",
};

function StatusBadge({ status }: Props) {
  const s = config[status] ?? {
    icon: Send,
    light: "bg-slate-100 border-slate-200 text-slate-600",
    dark:  "dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300",
  };
  const dot = dotColor[status] ?? "bg-slate-400 dark:bg-slate-500";
  const Icon = s.icon;

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${s.light} ${s.dark}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <Icon size={12} />
      {status}
    </span>
  );
}

export default StatusBadge;