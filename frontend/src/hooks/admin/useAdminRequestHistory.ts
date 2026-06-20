import { useQuery } from "@tanstack/react-query";
import { getAdminRequestHistory } from "../../services/admin/requests/adminRequest.service";
import type { AdminRequestHistoryEntry } from "../../types/admin/adminRequest.types";

export function useAdminRequestHistory(id: string | undefined) {
  return useQuery<AdminRequestHistoryEntry[]>({
    queryKey: ["adminRequestHistory", id],
    queryFn: () => {
      if (!id) throw new Error("ID is required");
      return getAdminRequestHistory(id);
    },
    enabled: !!id,
  });
}