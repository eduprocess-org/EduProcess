import { useEffect, useState } from "react";
import { getAdminRequests } from "../../services/admin/requests/adminRequest.service";
import type {
  AdminRequestListItem,
  AdminRequestFilters,
  RequestStatus,
} from "../../types/admin/adminRequest.types";

const VALID_STATUSES: RequestStatus[] = ["PENDING", "IN_REVIEW", "APPROVED", "REJECTED"];

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

      // Validar que el status sea uno de los valores permitidos (en mayúsculas)
      const validStatus = VALID_STATUSES.includes(status as RequestStatus)
        ? (status as RequestStatus)
        : undefined;

      const filters: AdminRequestFilters = {
        status: validStatus,
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