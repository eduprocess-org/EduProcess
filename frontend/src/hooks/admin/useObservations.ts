import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getObservationsByRequest, 
  createObservation, 
  deleteObservation 
} from "../../services/admin/observations/adminObservation.service";


export function useObservations(requestId: string) {
  return useQuery({
    queryKey: ["observations", requestId],
    queryFn: () => getObservationsByRequest(requestId),
    enabled: !!requestId, 
  });
}


export function useCreateObservation(requestId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: string) => createObservation(requestId, { comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observations", requestId] });
    },
  });
}

export function useDeleteObservation(requestId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteObservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["observations", requestId] });
    },
  });
}