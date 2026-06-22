import {
  useEffect,
  useState,
} from "react";

import { getProcedureDetails }
<<<<<<< HEAD
  from "../../services/procedures/procedure-details.service";

import type {
  ProcedureDetails,
} from "../../types/procedure-details.types";
=======
  from "../../services/student/procedures/procedure-details.service";

import type {
  ProcedureDetails,
} from "../../types/procedures/procedure-details.types";
>>>>>>> qa

export function useProcedureDetails(
  id: string
) {
  const [
    procedure,
    setProcedure,
  ] =
    useState<ProcedureDetails | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    const fetchProcedure =
      async () => {
        try {
          setLoading(true);

          const data =
            await getProcedureDetails(
              id
            );

          setProcedure(data);
        } catch {
          setError(
            "Failed to load procedure."
          );
        } finally {
          setLoading(false);
        }
      };

    fetchProcedure();
  }, [id]);

  return {
    procedure,
    loading,
    error,
  };
}