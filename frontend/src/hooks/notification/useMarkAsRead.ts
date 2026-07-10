import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../../services/notification/notificationService";

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
}