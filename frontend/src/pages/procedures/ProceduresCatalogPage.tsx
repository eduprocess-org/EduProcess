import ProceduresList from "../../components/procedures/ProceduresList";
import type { Procedure } from "../../types/procedure.types";

const mockProcedures: Procedure[] = [
  {
    id: "1",
    name: "Academic Transcript",
    description:
      "Request your official academic transcript issued by the institution.",
    estimatedProcessingTime: "3 business days",
    category: "Academic",
  },
  {
    id: "2",
    name: "Enrollment Certificate",
    description:
      "Generate proof of enrollment for academic and administrative purposes.",
    estimatedProcessingTime: "1 business day",
    category: "Academic",
  },
  {
    id: "3",
    name: "Scholarship Application",
    description:
      "Submit an application for financial assistance and scholarship programs.",
    estimatedProcessingTime: "5 business days",
    category: "Financial",
  },
];

function ProceduresCatalogPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            My Procedures
          </h1>

          <p className="mt-1 text-slate-600">
            Explore all academic procedures available
            for students.
          </p>
        </div>
      </div>

      <ProceduresList
        procedures={mockProcedures}
      />
    </div>
  );
}

export default ProceduresCatalogPage;