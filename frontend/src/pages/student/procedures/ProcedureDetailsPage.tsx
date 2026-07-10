import { useParams } from "react-router-dom";

import ProcedureHeader from "../../../components/procedure-details/ProcedureHeader";
import RequirementsSection from "../../../components/procedure-details/RequirementsSection";
import InstructionsSection from "../../../components/procedure-details/InstructionsSection";
import ProcedureDetailsSkeleton from "../../../components/procedure-details/ProcedureDetailsSkeleton";
import ProcedureNotFound from "../../../components/procedure-details/ProcedureNotFound";
import ProcedureDetailsError from "../../../components/procedure-details/ProcedureDetailsError";

import { useProcedureDetails } from "../../../hooks/procedures/useProcedureDetails";

function ProcedureDetailsPage() {
  const { id } = useParams();

  const { procedure, loading, error } = useProcedureDetails(id ?? "");

  if (loading) {
    return <ProcedureDetailsSkeleton />;
  }

  if (error) {
    return <ProcedureDetailsError message={error} />;
  }

  if (!procedure) {
    return <ProcedureNotFound />;
  }

  return (
    <div className="space-y-6">
      <ProcedureHeader
        id={procedure.id}
        name={procedure.name}
        description={procedure.description}
        estimatedProcessingTime={procedure.estimatedProcessingTime}
      />

      <div className="grid gap-6 ">
        <RequirementsSection requirements={procedure.requirements} />
      </div>

      <InstructionsSection instructions={procedure.instructions} />
    </div>
  );
}

export default ProcedureDetailsPage;