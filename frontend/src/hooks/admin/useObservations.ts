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
    enabled: !!requestId, // Evita llamadas con IDs indefinidos o vacíos
  });
}


export function useCreateObservation(requestId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: string) => createObservation(requestId, { comment }),
    onSuccess: () => {
      // Sincronización atómica: invalida la lista de observaciones de esta solicitud
      queryClient.invalidateQueries({ queryKey: ["observations", requestId] });
    },
  });
}

export function useDeleteObservation(requestId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteObservation(id),
    onSuccess: () => {
      // Refresca la línea de tiempo inmediatamente después del borrado
      queryClient.invalidateQueries({ queryKey: ["observations", requestId] });
    },
  });
}