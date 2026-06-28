import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminProceduresApi, type CreateProcedureInput } from "../../../services/admin/procedures/procedures.service";

export function useProcedureForm(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [requirementsText, setRequirementsText] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const validRequirements = requirements
        .filter((r) => r.trim() !== "")
        .map((r) => ({ name: r.trim(), description: r.trim(), isMandatory: true }));

      const input: CreateProcedureInput = {
        name,
        description,
        requirementsText: requirementsText || undefined,
        isActive: true,
        requirements: validRequirements.length > 0 ? validRequirements : undefined,
      };

      return adminProceduresApi.create(input);
    },
    onSuccess: () => {
      toast.success("Procedure created successfully");
      queryClient.invalidateQueries({ queryKey: ["adminProcedures"] });
      onSuccess();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || "An unexpected error occurred.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "The procedure name is required.";
    if (!description.trim()) newErrors.description = "The description is required.";

    const validRequirements = requirements.filter((r) => r.trim() !== "");
    if (validRequirements.length === 0) {
      newErrors.requirements = "Please specify at least one requirement.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    mutate();
  };

  return {
    form: { name, description, requirements, requirementsText },
    setters: { setName, setDescription, setRequirements, setRequirementsText },
    errors,
    isLoading: isPending,
    handleSubmit,
  };
}
