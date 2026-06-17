import {
  Files,
  Clock,
  CheckCircle,
  XCircle,
  type LucideIcon,
} from "lucide-react";

interface Props {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface SummaryCard {
  label: string;
  value: number;
  icon: LucideIcon;
  accent: string;
  tint: string;
}

function AdminDashboardSummary({
  total,
  pending,
  approved,
  rejected,
}: Props) {
  const cards: SummaryCard[] = [
    {
      label: "Total requests",
      value: total,
      icon: Files,
      accent: "#0B2D63",
      tint: "rgba(11,45,99,0.08)",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      accent: "#B45309",
      tint: "rgba(217,119,6,0.10)",
    },
    {
      label: "Approved",
      value: approved,
      icon: CheckCircle,
      accent: "#15803D",
      tint: "rgba(22,163,74,0.10)",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      accent: "#B91C1C",
      tint: "rgba(220,38,38,0.10)",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: card.tint }}
            >
              <Icon size={18} style={{ color: card.accent }} />
            </div>

            <p className="mt-4 text-3xl font-bold text-[#0B2D63] leading-none">
              {card.value}
            </p>

            <span className="text-slate-500 text-sm">
              {card.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default AdminDashboardSummary;