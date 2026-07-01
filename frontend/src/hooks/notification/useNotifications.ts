import { useQuery } from "@tanstack/react-query";
import { notificationService } from "../../services/notification/notificationService";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],

    queryFn: () => notificationService.getNotifications(),

    staleTime: 1000 * 60,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}