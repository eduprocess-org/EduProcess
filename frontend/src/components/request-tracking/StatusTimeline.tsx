import { Send, Clock, CheckCircle, XCircle, ListOrdered } from "lucide-react";

interface TimelineItem {
  status: string;
  date: string;
  description: string;
}

interface Props {
  timeline: TimelineItem[];
}

const stepConfig: Record<
  string,
  { icon: React.ElementType; iconBg: string; iconColor: string; dotColor: string; lineColor: string }
> = {
  Submitted: {
    icon: Send,
    iconBg:    "bg-[#EEF2FA] dark:bg-blue-900/30",
    iconColor: "text-[#0B2D63] dark:text-blue-300",
    dotColor:  "border-[#0B2D63] dark:border-blue-500",
    lineColor: "bg-[#0B2D63] dark:bg-blue-700",
  },
  "Under Review": {
    icon: Clock,
    iconBg:    "bg-[#FAEEDA] dark:bg-yellow-900/30",
    iconColor: "text-[#854F0B] dark:text-yellow-300",
    dotColor:  "border-[#EF9F27] dark:border-yellow-500",
    lineColor: "bg-[#EF9F27] dark:bg-yellow-700",
  },
  Approved: {
    icon: CheckCircle,
    iconBg:    "bg-[#E1F5EE] dark:bg-emerald-900/30",
    iconColor: "text-[#0F6E56] dark:text-emerald-300",
    dotColor:  "border-[#1D9E75] dark:border-emerald-500",
    lineColor: "bg-[#1D9E75] dark:bg-emerald-700",
  },
  Rejected: {
    icon: XCircle,
    iconBg:    "bg-[#FCEBEB] dark:bg-red-900/30",
    iconColor: "text-[#A32D2D] dark:text-red-300",
    dotColor:  "border-[#E24B4A] dark:border-red-500",
    lineColor: "bg-[#E24B4A] dark:bg-red-700",
  },
};

const fallback = {
  icon: Clock,
  iconBg:    "bg-slate-100 dark:bg-gray-800",
  iconColor: "text-slate-500 dark:text-slate-400",
  dotColor:  "border-slate-300 dark:border-slate-600",
  lineColor: "bg-slate-200 dark:bg-gray-700",
};

function StatusTimeline({ timeline }: Props) {
  return (
    <div className="rounded-2xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm dark:shadow-none p-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-5 mb-5 border-b border-slate-100 dark:border-gray-700">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAEEDA] dark:bg-yellow-900/30 text-[#854F0B] dark:text-yellow-300">
          <ListOrdered size={15} />
        </div>
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Timeline</h2>
        <span className="ml-auto rounded-full border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          {timeline.length} steps
        </span>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-0">
        {timeline.map((item, index) => {
          const s = stepConfig[item.status] ?? fallback;
          const Icon = s.icon;
          const isLast = index === timeline.length - 1;

          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border-2 ${s.dotColor} ${s.iconBg} ${s.iconColor}`}>
                  <Icon size={15} />
                </div>
                {!isLast && (
                  <div className={`mt-1 w-0.5 flex-1 min-h-[28px] ${s.lineColor} opacity-30`} />
                )}
              </div>
              <div className={`flex flex-col gap-1 pb-6 ${isLast ? "pb-0" : ""}`}>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.status}</p>
                <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{item.date}</p>
                <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatusTimeline;