import { useEffect, useState } from "react";
import { getProcedures } from "../../services/student/procedures/procedures.service";
import type { Procedure } from "../../types/procedures/procedure.types";

export function useProcedureTypes() {
  const [procedureTypes, setProcedureTypes] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProcedureTypes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProcedures();
        setProcedureTypes(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load procedure types.");
      } finally {
        setLoading(false);
      }
    };

    loadProcedureTypes();
  }, []);

  return {
    procedureTypes,
    loading,
    error,
  };
}
