import { useEffect, useState } from "react";
import  {
  getRequests,
  type GetRequestsParams,
} from "../../services/admin/requests/request.service";
import type { ProcedureRequest } from "../../types/admin/request";

export function useRequests(params: GetRequestsParams) {
  const [requests, setRequests] = useState<
    ProcedureRequest[]
  >([]);

  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const response = await getRequests(params);

        setRequests(response.data);

        setTotal(response.total);

        setError("");
      } catch {
        setError("Failed to load requests.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [
    params.page,
    params.limit,
    params.search,
    params.status,
    params.procedure,
  ]);

  return {
    requests,
    total,
    loading,
    error,
  };
}