import {
  useEffect,
  useState,
} from "react";

import { getProcedures } from "../../services/student/procedures/procedures.service";

import type { Procedure } from "../../types/procedures/procedure.types";

export function useProcedures() {
  const [procedures, setProcedures] =
    useState<Procedure[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        setLoading(true);

        const data =
          await getProcedures();

        setProcedures(data);
      } catch {
        setError(
          "Unable to load procedures."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProcedures();
  }, []);

  return {
    procedures,
    loading,
    error,
  };
}