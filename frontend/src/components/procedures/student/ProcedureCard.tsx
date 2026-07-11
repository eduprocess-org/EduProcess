import { GraduationCap, Clock3, ArrowRight } from "lucide-react";
import type { Procedure } from "../../../types/procedures/procedure.types";
import { useNavigate } from "react-router-dom";

interface ProcedureCardProps {
  procedure: Procedure;
}

function ProcedureCard({ procedure }: ProcedureCardProps) {
  const navigate = useNavigate();

  const getCategoryStyles = (category: string) => {
    switch (category.toLowerCase()) {
      case "academic":
        return "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700/50";
      case "financial":
        return "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700/50";
      case "administrative":
        return "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/50";
      case "graduation":
        return "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/50";
      default:
        return "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-600";
    }
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-none dark:hover:border-gray-600">

      <div className="mb-5 flex items-center justify-between">
        <GraduationCap size={24} className="text-[#0B2D63] dark:text-blue-400" />
        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getCategoryStyles(procedure.category)}`}>
          {procedure.category}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        {procedure.name}
      </h3>

      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {procedure.description}
      </p>

      <div className="mt-auto">
        <div className="mt-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Clock3 size={16} />
          <span>{procedure.estimatedProcessingTime}</span>
        </div>

        <button
          onClick={() => navigate(`/procedures/${procedure.id}`)}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2D63] dark:bg-blue-700 px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#09224E] dark:hover:bg-blue-600"
        >
          View Procedure
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default ProcedureCard;