import { useEffect, useState } from "react";

import { getAdminRequests } from "../../services/admin/requests/requestManagement.service";

import type {
  AdminRequest,
  RequestFilters,
} from "../../services/admin/requests/requestManagement.service";

export function useAdminRequests(
  filters: RequestFilters
) {
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadRequests();
  }, [JSON.stringify(filters)]);

  async function loadRequests() {
    try {
      setLoading(true);
      setError(null);

      const response = await getAdminRequests(filters);

      setRequests(response.requests);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err: any) {
      setError(err.message || "Failed to load requests.");
    } finally {
      setLoading(false);
    }
  }

  return {
    requests,
    loading,
    error,
    total,
    totalPages,
    reload: loadRequests,
  };
}