import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminProceduresApi, type CreateProcedureInput, type Faculty, type CareerWithFaculty } from "../../../services/admin/procedures/procedures.service";

export function useProcedureForm(onSuccess: () => void) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [requirementsText, setRequirementsText] = useState("");
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [isSpecific, setIsSpecific] = useState(false);
  const [facultyId, setFacultyId] = useState("");
  const [careerId, setCareerId] = useState("");
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [allCareers, setAllCareers] = useState<CareerWithFaculty[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([adminProceduresApi.getFaculties(), adminProceduresApi.getCareers()])
      .then(([facs, careers]) => {
        setFaculties(facs);
        setAllCareers(careers);
      })
      .catch(() => {});
  }, []);

  const filteredCareers = facultyId
    ? allCareers.filter((c) => c.faculty.id === facultyId)
    : [];

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const validRequirements = requirements
        .filter((r) => r.trim() !== "")
        .map((r) => ({ name: r.trim(), description: r.trim(), isMandatory: true }));

      const input: CreateProcedureInput = {
        name,
        description,
        requirementsText: requirementsText || undefined,
        instructions: instructions.filter((i) => i.trim()).join("\n") || undefined,
        isActive: true,
        requirements: validRequirements.length > 0 ? validRequirements : undefined,
        facultyId: isSpecific && facultyId ? facultyId : null,
        careerId: isSpecific && careerId ? careerId : null,
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
    if (!requirementsText.trim()) newErrors.requirementsText = "The requirements summary is required.";

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
    form: { name, description, requirements, requirementsText, instructions, isSpecific, facultyId, careerId },
    setters: { setName, setDescription, setRequirements, setRequirementsText, setInstructions, setIsSpecific, setFacultyId, setCareerId },
    faculties,
    filteredCareers,
    errors,
    isLoading: isPending,
    handleSubmit,
  };
}
