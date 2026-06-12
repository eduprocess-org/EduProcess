import { useParams } from "react-router-dom";

import ProcedureRequestForm from "../../components/forms/ProcedureRequestForm";

function ProcedureRequestPage() {
  const { id } = useParams();

  const mockProcedure = {
    id: id ?? "",
    name: "Academic Certificate",
    description:
      "Request an official academic certificate.",
    estimatedProcessingTime:
      "3 Business Days",
    dynamicFields: [
      {
        name: "reason",
        label: "Reason",
        type: "text",
      },
    ],
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

      <ProcedureRequestForm procedure={mockProcedure} />
    </div>
  );
}

export default ProcedureRequestPage;
