import { useQuery } from "@tanstack/react-query";
import { getAdminRequestDocuments } from "../../services/admin/requests/adminRequest.service";
import type { AdminRequestDocument } from "../../types/admin/adminRequest.types";

export function useAdminRequestDocuments(id: string | undefined) {
  return useQuery<AdminRequestDocument[]>({
    queryKey: ["adminRequestDocuments", id],
    queryFn: () => {
      if (!id) throw new Error("ID is required");
      return getAdminRequestDocuments(id);
    },
    enabled: !!id,
  });
}