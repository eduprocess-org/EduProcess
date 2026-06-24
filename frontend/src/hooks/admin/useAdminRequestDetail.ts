// src/hooks/admin/useAdminRequestDetail.ts
import { useQuery } from "@tanstack/react-query";
import { getAdminRequestDetail } from "../../services/admin/requests/adminRequest.service";
import type { AdminRequestDetail } from "../../types/admin/adminRequest.types";

export function useAdminRequestDetail(id: string | undefined) {
  return useQuery<AdminRequestDetail>({
    queryKey: ["adminRequestDetail", id],
    queryFn: () => {
      if (!id) throw new Error("ID is required");
      return getAdminRequestDetail(id);
    },
    enabled: !!id, 
  });
}