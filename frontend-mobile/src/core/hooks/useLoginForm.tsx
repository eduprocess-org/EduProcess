import { useForm } from 'react-hook-form';

interface UseLoginFormProps {
  onSubmit: (data: any) => Promise<void>;
}

export function useLoginForm({ onSubmit }: UseLoginFormProps) {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return {
    control,
    handleFormSubmit,
    isLoading: isSubmitting,
  };
}