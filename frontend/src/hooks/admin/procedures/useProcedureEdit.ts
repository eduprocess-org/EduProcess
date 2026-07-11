import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { adminProceduresApi, type UpdateProcedureInput, type Faculty, type CareerWithFaculty } from "../../../services/admin/procedures/procedures.service";

export function useProcedureEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
  const [isActive, setIsActive] = useState(true);

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      id ? adminProceduresApi.getById(id) : Promise.reject("No id"),
      adminProceduresApi.getFaculties(),
      adminProceduresApi.getCareers(),
    ])
      .then(([procedure, facs, careers]) => {
        setName(procedure.name);
        setDescription(procedure.description);
        setRequirementsText(procedure.requirementsText || "");
        setInstructions(procedure.instructions ? procedure.instructions.split("\n").filter(Boolean) : [""]);
        setIsActive(procedure.isActive);
        setIsSpecific(!!procedure.facultyId);
        setFacultyId(procedure.facultyId || "");
        setCareerId(procedure.careerId || "");
        setFaculties(facs);
        setAllCareers(careers);
        if (procedure.requirements.length > 0) {
          setRequirements(procedure.requirements.map((r) => r.name));
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Error loading procedure data");
        navigate("/admin/procedures");
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  }, [id, navigate]);

  const filteredCareers = facultyId
    ? allCareers.filter((c) => c.faculty.id === facultyId)
    : [];

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
        instructions: instructions.filter((i) => i.trim()).join("\n") || undefined,
        isActive,
        requirements: validRequirements,
        facultyId: isSpecific && facultyId ? facultyId : null,
        careerId: isSpecific && careerId ? careerId : null,
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
    instructions,
    setInstructions,
    isSpecific,
    setIsSpecific,
    facultyId,
    setFacultyId,
    careerId,
    setCareerId,
    faculties,
    filteredCareers,
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
