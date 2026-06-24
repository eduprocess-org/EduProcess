import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { mockProcedureEditService } from "../../../services/admin/procedures/mockProcedureEditService";

export function useProcedureEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [status, setStatus] = useState<"active" | "draft">("active");

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) return;
    
    setIsLoadingData(true);
    mockProcedureEditService.getProcedureById(id)
      .then((procedure) => {
        setName(procedure.name);
        setDescription(procedure.description);
        setRequirements(procedure.requirements.length > 0 ? procedure.requirements : [""]);
        setEstimatedTime(procedure.estimatedTime);
        setStatus(procedure.status);
      })
      .catch((err) => {
        toast.error(err.message || "Error loading procedure data");
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
    if (!estimatedTime.trim()) newErrors.estimatedTime = "Estimated processing time is required.";
    
    const validReqs = requirements.filter(r => r.trim() !== "");
    if (validReqs.length === 0) newErrors.requirements = "At least one valid requirement is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !validateForm()) return;

    setIsUpdating(true);
    try {
      const cleanRequirements = requirements.filter(r => r.trim() !== "");
      await mockProcedureEditService.updateProcedure(id, {
        name,
        description,
        requirements: cleanRequirements,
        estimatedTime,
        status,
      });
      
      toast.success("Procedure updated successfully.");
      navigate("/admin/procedures");
    } catch (err: any) {
      toast.error(err.message || "Failed to update procedure.");
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
    estimatedTime,
    setEstimatedTime,
    status,
    setStatus,
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