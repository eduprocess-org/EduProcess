import { useEffect, useState } from "react";
import { getAdminRequests } from "../../services/admin/requests/adminRequest.service";

import type {
  AdminRequestListItem,
  AdminRequestFilters,
} from "../../types/admin/adminRequest.types";

interface UseAdminRequestsParams {
  page: number;
  limit: number;
  search: string;
  status: string;
  procedureTypeId: string; 
  sortField: string;
  sortDirection: "asc" | "desc";
}

export function useAdminRequests(params: UseAdminRequestsParams) {
  const [requests, setRequests] = useState<AdminRequestListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const { page, limit, search, status, procedureTypeId, sortField, sortDirection } = params;

  useEffect(() => {
    loadRequests();
  }, [page, limit, search, status, procedureTypeId, sortField, sortDirection]);

  async function loadRequests() {
    try {
      setLoading(true);
      setError(null);

      const filters: AdminRequestFilters = {
        status: status || undefined,
        search: search || undefined,
        procedureTypeId: procedureTypeId || undefined,
      };

      const response = await getAdminRequests(
        filters,
        page,
        limit,
        sortField,
        sortDirection
      );

      setRequests(response.data);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (err: any) {
      setError(err?.message || "Failed to load requests.");
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