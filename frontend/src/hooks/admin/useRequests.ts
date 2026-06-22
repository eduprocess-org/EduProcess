import { useEffect, useState } from "react";
import  {
  getRequests,
  type GetRequestsParams,
} from "../../services/admin/requests/request.service";
import type { AdminRequestListItem } from '../../types/admin/adminRequest.types';

export function useRequests(params: GetRequestsParams) {
 const [requests, setRequests] = useState<AdminRequestListItem[]>([]);


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
    params.procedureTypeId,
  ]);

  return {
    requests,
    total,
    loading,
    error,
  };
}