import {
  GraduationCap,
  Clock3,
  ArrowRight,
} from "lucide-react";

import type { Procedure } from "../../types/procedure.types";
import { useNavigate } from "react-router-dom";

interface ProcedureCardProps {
  procedure: Procedure;
}

function ProcedureCard({
  procedure,
}: ProcedureCardProps) {
  const navigate = useNavigate();
  const getCategoryStyles = (
    category: string
  ) => {
    switch (category.toLowerCase()) {
      case "academic":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "financial":
        return "bg-green-50 text-green-700 border-green-200";

      case "administrative":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "graduation":
        return "bg-amber-50 text-amber-700 border-amber-200";

      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div
      className="
        flex
        h-full
        flex-col
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <GraduationCap
          size={24}
          className="text-[#0B2D63]"
        />

        <span
          className={`
            inline-flex
            items-center
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-semibold
            ${getCategoryStyles(
              procedure.category
            )}
          `}
        >
          {procedure.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-slate-900">
        {procedure.name}
      </h3>

      {/* Description */}
      <p
        className="
          mt-4
          text-sm
          leading-6
          text-slate-600
        "
      >
        {procedure.description}
      </p>

      {/* Footer */}
      <div className="mt-auto">
        <div
          className="
            mt-6
            flex
            items-center
            gap-2
            text-sm
            text-slate-500
          "
        >
          <Clock3 size={16} />

          <span>
            {procedure.estimatedProcessingTime}
          </span>
        </div>

            <button
            onClick={() =>
                navigate(`/procedures/${procedure.id}`)
            }
            className="
                mt-6
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#0B2D63]
                px-4
                py-3
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:bg-[#09224E]
            "
            >
            View Procedure

            <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default ProcedureCard;