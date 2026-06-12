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
    iconBg: "bg-[#EEF2FA]",
    iconColor: "text-[#0B2D63]",
    dotColor: "border-[#0B2D63]",
    lineColor: "bg-[#0B2D63]",
  },
  "Under Review": {
    icon: Clock,
    iconBg: "bg-[#FAEEDA]",
    iconColor: "text-[#854F0B]",
    dotColor: "border-[#EF9F27]",
    lineColor: "bg-[#EF9F27]",
  },
  Approved: {
    icon: CheckCircle,
    iconBg: "bg-[#E1F5EE]",
    iconColor: "text-[#0F6E56]",
    dotColor: "border-[#1D9E75]",
    lineColor: "bg-[#1D9E75]",
  },
  Rejected: {
    icon: XCircle,
    iconBg: "bg-[#FCEBEB]",
    iconColor: "text-[#A32D2D]",
    dotColor: "border-[#E24B4A]",
    lineColor: "bg-[#E24B4A]",
  },
};

const fallback = {
  icon: Clock,
  iconBg: "bg-slate-100",
  iconColor: "text-slate-500",
  dotColor: "border-slate-300",
  lineColor: "bg-slate-200",
};

function StatusTimeline({ timeline }: Props) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-5 mb-5 border-b border-slate-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAEEDA] text-[#854F0B]">
          <ListOrdered size={15} />
        </div>
        <h2 className="text-sm font-semibold text-slate-800">Timeline</h2>
        <span className="ml-auto rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
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
              {/* Left: icon + line */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-xl border-2 ${s.dotColor} ${s.iconBg} ${s.iconColor}
                  `}
                >
                  <Icon size={15} />
                </div>
                {!isLast && (
                  <div className={`mt-1 w-0.5 flex-1 min-h-[28px] ${s.lineColor} opacity-30`} />
                )}
              </div>

              {/* Right: content */}
              <div className={`flex flex-col gap-1 pb-6 ${isLast ? "pb-0" : ""}`}>
                <p className="text-sm font-semibold text-slate-900">{item.status}</p>
                <p className="text-[11px] font-medium text-slate-400">{item.date}</p>
                <p className="mt-0.5 text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatusTimeline;