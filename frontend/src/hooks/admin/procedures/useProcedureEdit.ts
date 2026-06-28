import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { adminProceduresApi, type UpdateProcedureInput } from "../../../services/admin/procedures/procedures.service";

export function useProcedureEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [requirementsText, setRequirementsText] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) return;

    setIsLoadingData(true);
    adminProceduresApi
      .getById(id)
      .then((procedure) => {
        setName(procedure.name);
        setDescription(procedure.description);
        setRequirementsText(procedure.requirementsText || "");
        setIsActive(procedure.isActive);
        if (procedure.requirements.length > 0) {
          setRequirements(procedure.requirements.map((r) => r.name));
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Error loading procedure data");
        navigate("/admin/procedures");
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  }, [id, navigate]);

  const handleAddRequirement = () => setRequirements([...requirements, ""]);

  const handleRequirementChange = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const handleRemoveRequirement = (index: number) => {
    if (requirements.length === 1) {
      setRequirements([""]);
    } else {
      setRequirements(requirements.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "The procedure name is required.";
    if (!description.trim()) newErrors.description = "The description is required.";

    const validReqs = requirements.filter((r) => r.trim() !== "");
    if (validReqs.length === 0) newErrors.requirements = "At least one valid requirement is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !validateForm()) return;

    setIsUpdating(true);
    try {
      const validRequirements = requirements
        .filter((r) => r.trim() !== "")
        .map((r) => ({ name: r.trim(), description: r.trim(), isMandatory: true }));

      const input: UpdateProcedureInput = {
        name,
        description,
        requirementsText: requirementsText || undefined,
        isActive,
        requirements: validRequirements,
      };

      await adminProceduresApi.update(id, input);
      toast.success("Procedure updated successfully.");
      navigate("/admin/procedures");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update procedure.");
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    requirements,
    requirementsText,
    setRequirementsText,
    isActive,
    setIsActive,
    errors,
    isLoadingData,
    isUpdating,
    handleAddRequirement,
    handleRequirementChange,
    handleRemoveRequirement,
    handleSubmit,
    navigate,
  };
}
