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
  darkAccent: string;
  darkTint: string;
}

function AdminDashboardSummary({ total, pending, approved, rejected }: Props) {
  const cards: SummaryCard[] = [
    {
      label: "Total requests",
      value: total,
      icon: Files,
      accent: "#0B2D63",
      tint: "rgba(11,45,99,0.08)",
      darkAccent: "#93C5FD",
      darkTint: "rgba(147,197,253,0.12)",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      accent: "#B45309",
      tint: "rgba(217,119,6,0.10)",
      darkAccent: "#FCD34D",
      darkTint: "rgba(252,211,77,0.12)",
    },
    {
      label: "Approved",
      value: approved,
      icon: CheckCircle,
      accent: "#15803D",
      tint: "rgba(22,163,74,0.10)",
      darkAccent: "#4ADE80",
      darkTint: "rgba(74,222,128,0.12)",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      accent: "#B91C1C",
      tint: "rgba(220,38,38,0.10)",
      darkAccent: "#F87171",
      darkTint: "rgba(248,113,113,0.12)",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="
              bg-white dark:bg-gray-900
              rounded-2xl p-5
              shadow-sm dark:shadow-none
              border border-slate-100 dark:border-gray-700
              transition-all duration-200
              hover:shadow-md hover:-translate-y-0.5
            "
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: `light-dark(${card.tint}, ${card.darkTint})`,
              }}
            >
              {/* We render two icons and toggle visibility via dark: */}
              <Icon size={18} className="text-[#0B2D63] dark:hidden" style={{ color: card.accent }} />
              <Icon size={18} className="hidden dark:block" style={{ color: card.darkAccent }} />
            </div>

            <p className="mt-4 text-3xl font-bold text-[#0B2D63] dark:text-blue-300 leading-none">
              {card.value}
            </p>

            <span className="text-slate-500 dark:text-slate-400 text-sm">
              {card.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default AdminDashboardSummary;