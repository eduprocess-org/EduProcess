import { useParams } from "react-router-dom";

import ProcedureRequestForm from "../../../components/forms/procedures/ProcedureRequestForm";
import ProcedureDetailsSkeleton from "../../../components/procedure-details/ProcedureDetailsSkeleton";
import { useProcedureDetails } from "../../../hooks/procedures/useProcedureDetails";

function ProcedureRequestPage() {
  const { id } = useParams();
  const { procedure, loading } = useProcedureDetails(id ?? "");

  if (loading) {
    return <ProcedureDetailsSkeleton />;
  }

  const displayProcedure = procedure ?? {
    id: id ?? "",
    name: "Academic Procedure",
    description: "Complete the form below to submit your request.",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Request Procedure
        </h1>

        <p className="mt-1.5 text-sm text-slate-500">
          Complete the form below to submit your request.
        </p>
      </div>

      <ProcedureRequestForm procedure={displayProcedure} />
    </div>
  );
}

export default ProcedureRequestPage;
