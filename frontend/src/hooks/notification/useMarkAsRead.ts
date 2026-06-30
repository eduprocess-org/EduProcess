import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../useAuth";
import { notificationService } from "../../services/notification/notificationService";

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  return useMutation({
    mutationFn: notificationService.markAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", user?.id],
      });
    },
  });
}