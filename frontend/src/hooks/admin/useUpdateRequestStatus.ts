import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRequestStatus } from '../../services/admin/requests/adminRequest.service';
import { toast } from 'sonner';

export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, comment }: { id: string; status: string; comment?: string }) =>
      updateRequestStatus(id, status, comment),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({ queryKey: ['adminRequestDetail', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['adminRequests'] });
      toast.success(`Solicitud ${variables.status} con éxito.`);
    },
    onError: (error) => {
      toast.error('Error al actualizar el estado.');
      console.error(error);
    },
  });
};