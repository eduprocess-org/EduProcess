// src/hooks/admin/useProcedureForm.ts
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockProcedureService } from "../../../services/admin/procedures/mockProcedureService";

export function useProcedureForm(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [status, setStatus] = useState<"active" | "draft">("active");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isPending } = useMutation({
    mutationFn: mockProcedureService.create,
    onSuccess: () => {
      toast.success("Procedure registered successfully (Mock DB updated)");
      queryClient.invalidateQueries({ queryKey: ["adminProcedures"] });
      onSuccess();
    },
    onError: (err: any) => {
      toast.error(err.message || "An unexpected error occurred.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "The procedure name is required.";
    if (!description.trim()) newErrors.description = "The description is required.";
    if (!estimatedTime.trim()) newErrors.estimatedTime = "Estimated processing time is required.";
    
    const validRequirements = requirements.filter(r => r.trim() !== "");
    if (validRequirements.length === 0) {
      newErrors.requirements = "Please specify at least one requirement.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    mutate({ name, description, requirements: validRequirements, estimatedTime, status });
  };

  return {
    form: { name, description, requirements, estimatedTime, status },
    setters: { setName, setDescription, setRequirements, setEstimatedTime, setStatus },
    errors,
    isLoading: isPending,
    handleSubmit
  };
}