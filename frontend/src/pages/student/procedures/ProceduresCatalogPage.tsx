import ProceduresList from "../../../components/procedures/ProceduresList";
import ProceduresLoading from "../../../components/procedures/ProceduresLoading";
import ProceduresError from "../../../components/procedures/ErrorProcedures";
import ProceduresEmpty from "../../../components/procedures/EmptyProcedures";

import { useProcedures } from "../../../hooks/procedures/useProcedures";

function ProceduresCatalogPage() {
  const {
    procedures,
    loading,
    error,
  } = useProcedures();

  if (loading) {
    return <ProceduresLoading />;
  }

  if (error) {
    return (
      <ProceduresError
        message={error}
      />
    );
  }

  if (!procedures.length) {
    return <ProceduresEmpty />;
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            My Procedures
          </h1>

          <p className="mt-1 text-slate-600">
            Explore all academic procedures
            available for students.
          </p>
        </div>
      </div>

      <ProceduresList
        procedures={procedures}
      />
    </div>
  );
}

export default ProceduresCatalogPage;