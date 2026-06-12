import { Clock, CheckCircle, XCircle, Send } from "lucide-react";

interface Props {
  status: string;
}

const config: Record<
  string,
  {
    icon: React.ElementType;
    bg: string;
    border: string;
    text: string;
    dot: string;
  }
> = {
  Submitted: {
    icon: Send,
    bg: "bg-[#EEF2FA]",
    border: "border-[#b8c9e8]",
    text: "text-[#0B2D63]",
    dot: "bg-[#0B2D63]",
  },
  "Under Review": {
    icon: Clock,
    bg: "bg-[#FAEEDA]",
    border: "border-[#FAC775]",
    text: "text-[#854F0B]",
    dot: "bg-[#EF9F27]",
  },
  Approved: {
    icon: CheckCircle,
    bg: "bg-[#E1F5EE]",
    border: "border-[#9FE1CB]",
    text: "text-[#0F6E56]",
    dot: "bg-[#1D9E75]",
  },
  Rejected: {
    icon: XCircle,
    bg: "bg-[#FCEBEB]",
    border: "border-[#F7C1C1]",
    text: "text-[#A32D2D]",
    dot: "bg-[#E24B4A]",
  },
};

function StatusBadge({ status }: Props) {
  const s = config[status] ?? {
    icon: Send,
    bg: "bg-slate-100",
    border: "border-slate-200",
    text: "text-slate-600",
    dot: "bg-slate-400",
  };

  const Icon = s.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-2
        rounded-full border px-3.5 py-1.5
        text-xs font-semibold
        ${s.bg} ${s.border} ${s.text}
      `}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      <Icon size={12} />
      {status}
    </span>
  );
}

export default StatusBadge;