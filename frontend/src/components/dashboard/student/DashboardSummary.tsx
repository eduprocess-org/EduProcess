import {
  Files,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Check,
  X,
} from "lucide-react";
import type { StudentRequest } from "../../../types/student/studentRequest.types";

interface Props {
  requests: StudentRequest[];
}

function DashboardSummary({ requests }: Props) {
  const total = requests.length;
  const pending = requests.filter((r) => r.status === "PENDING").length;
  const approved = requests.filter((r) => r.status === "APPROVED").length;
  const rejected = requests.filter((r) => r.status === "REJECTED").length;

  const cards = [
    {
      label: "Total",
      value: total,
      icon: Files,
      footerIcon: TrendingUp,
      footerText: "All time",
      iconBg: "bg-[#EEF2FA] dark:bg-blue-900/30",
      iconColor: "text-[#0B2D63] dark:text-blue-300",
      valueColor: "text-[#0B2D63] dark:text-blue-300",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      footerIcon: Clock,
      footerText: "Awaiting review",
      iconBg: "bg-[#FAEEDA] dark:bg-yellow-900/30",
      iconColor: "text-[#854F0B] dark:text-yellow-300",
      valueColor: "text-[#BA7517] dark:text-yellow-300",
    },
    {
      label: "Approved",
      value: approved,
      icon: CheckCircle,
      footerIcon: Check,
      footerText: "Completed",
      iconBg: "bg-[#E1F5EE] dark:bg-emerald-900/30",
      iconColor: "text-[#0F6E56] dark:text-emerald-300",
      valueColor: "text-[#0F6E56] dark:text-emerald-300",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      footerIcon: X,
      footerText: "Needs action",
      iconBg: "bg-[#FCEBEB] dark:bg-red-900/30",
      iconColor: "text-[#A32D2D] dark:text-red-300",
      valueColor: "text-[#A32D2D] dark:text-red-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const FooterIcon = card.footerIcon;

        return (
          <div
            key={card.label}
            className="flex min-h-[130px] flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:shadow-none"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-[#0B2D63] dark:text-blue-200 sm:text-[15px]">
                {card.label}
              </span>

              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.iconBg} ${card.iconColor}`}
              >
                <Icon size={15} />
              </div>
            </div>

            <p
              className={`text-2xl font-semibold leading-none sm:text-3xl ${card.valueColor}`}
            >
              {card.value}
            </p>

            <div className="mt-auto flex items-center gap-1.5 text-[13px] text-slate-400 dark:text-slate-500">
              <FooterIcon size={11} />
              <span>{card.footerText}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardSummary;