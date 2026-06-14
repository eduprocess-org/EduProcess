import {
  ArrowLeft,
  Clock3,
  Send,
  FileText,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

interface Props {
  id: string;
  name: string;
  description: string;
  estimatedProcessingTime: string;
}

function ProcedureHeader({
  id,
  name,
  description,
  estimatedProcessingTime,
}: Props) {
  const navigate = useNavigate();

  return (
    <>
      <Link
        to="/procedures"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-slate-500
          hover:text-slate-800
          transition-colors
        "
      >
        <ArrowLeft size={15} />
        Back to Procedures
      </Link>

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-sm
          border
          border-slate-100
        "
      >
        <div className="h-[3px] w-full bg-[#0B2D63]" />

        <div className="p-8">
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-1.5
              rounded-full
              bg-[#EEF2FA]
              px-3
              py-1
              text-[11px]
              font-semibold
              uppercase
              tracking-wide
              text-[#0B2D63]
            "
          >
            <FileText size={11} />
            Official Procedure
          </div>

          <h1
            className="
              text-2xl
              font-semibold
              text-slate-900
              leading-snug
            "
          >
            {name}
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-relaxed
              text-slate-500
              max-w-2xl
            "
          >
            {description}
          </p>

          <div
            className="
              mt-6
              pt-5
              border-t
              border-slate-100
              flex
              flex-wrap
              items-center
              justify-between
              gap-4
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-200
                bg-slate-50
                px-4
                py-1.5
                text-sm
                font-medium
                text-slate-500
              "
            >
              <Clock3
                size={14}
                className="text-[#0B2D63]"
              />
              {estimatedProcessingTime}
            </div>

            <button
              onClick={() =>
                navigate(
                  `/procedures/${id}/request`
                )
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#0B2D63]
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#09224E]
                active:scale-[0.98]
              "
            >
              <Send size={15} />
              Start Request
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProcedureHeader;