import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { adminProceduresApi, type ProcedureListItem } from "../../../services/admin/procedures/procedures.service";

const PAGE_SIZE = 5;

export function useProcedures() {
  const [procedures, setProcedures] = useState<ProcedureListItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchProcedures = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await adminProceduresApi.getAll({
        page,
        limit: PAGE_SIZE,
        search: search.trim() || undefined,
        sortBy: "name",
        order: sortOrder,
      });
      setProcedures(response.data);
      setTotalItems(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error loading procedures");
    } finally {
      setIsLoading(false);
    }
  }, [page, search, sortOrder]);

  useEffect(() => {
    fetchProcedures();
  }, [fetchProcedures]);

  return {
    procedures,
    totalItems,
    totalPages,
    isLoading,

    page,
    setPage,

    search,
    setSearch,

    sortOrder,
    setSortOrder,

    refresh: fetchProcedures,
  };
}
