import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../useAuth";
import { notificationService } from "../../services/notification/notificationService";

export function useNotifications() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["notifications", user?.id],

    queryFn: () => notificationService.getNotifications(user!.id),

    enabled: !!user,

    staleTime: 1000 * 60,

    retry: 1,

    refetchOnWindowFocus: false,
  });
}