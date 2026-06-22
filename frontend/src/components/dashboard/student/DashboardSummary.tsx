import { Files, Clock, CheckCircle, XCircle, TrendingUp, Check, X } from "lucide-react";
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
      iconBg: "bg-[#EEF2FA]",
      iconColor: "text-[#0B2D63]",
      valueColor: "text-[#0B2D63]",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      footerIcon: Clock,
      footerText: "Awaiting review",
      iconBg: "bg-[#FAEEDA]",
      iconColor: "text-[#854F0B]",
      valueColor: "text-[#BA7517]",
    },
    {
      label: "Approved",
      value: approved,
      icon: CheckCircle,
      footerIcon: Check,
      footerText: "Completed",
      iconBg: "bg-[#E1F5EE]",
      iconColor: "text-[#0F6E56]",
      valueColor: "text-[#0F6E56]",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      footerIcon: X,
      footerText: "Needs action",
      iconBg: "bg-[#FCEBEB]",
      iconColor: "text-[#A32D2D]",
      valueColor: "text-[#A32D2D]",
    },
  ];

  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const FooterIcon = card.footerIcon;
        return (
          <div
            key={card.label}
            className="
              flex flex-col gap-3
              rounded-2xl border border-slate-100
              bg-white p-4 shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-medium uppercase tracking-wide text-[#0B2D63]">
                {card.label}
              </span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.iconBg} ${card.iconColor}`}
              >
                <Icon size={15} />
              </div>
            </div>

            <p className={`text-3xl font-semibold leading-none ${card.valueColor}`}>
              {card.value}
            </p>

            <div className="flex items-center gap-1.5 text-[13px] text-slate-400">
              <FooterIcon size={11} />
              {card.footerText}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardSummary;
