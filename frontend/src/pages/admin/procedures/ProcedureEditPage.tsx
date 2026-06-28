import { ArrowLeft, Loader2 } from "lucide-react";
import { useProcedureEdit } from "../../../hooks/admin/procedures/useProcedureEdit";
import ProcedureEditForm from "../../../components/procedures/admin/ProcedureEditForm";

export default function ProcedureEditPage() {
  const {
    name, setName,
    description, setDescription,
    requirements,
    requirementsText, setRequirementsText,
    isActive, setIsActive,
    errors, isLoadingData, isUpdating,
    handleAddRequirement, handleRequirementChange, handleRemoveRequirement,
    handleSubmit, navigate,
  } = useProcedureEdit();

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-6 px-6 transition-colors duration-200">
      <div className="mx-auto max-w-2xl space-y-4">

        {/* BACK ACTION */}
        <button
          onClick={() => navigate("/admin/procedures")}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors uppercase tracking-wider"
          type="button"
          disabled={isUpdating}
        >
          <ArrowLeft height={14} width={14} />
          Back to management
        </button>

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Modify Procedure Type</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Update baseline parameters for dynamic university protocols.</p>
        </div>

        {/* ATOMIC FORM COMPONENT */}
        <ProcedureEditForm
          formData={{ name, description, requirements, requirementsText, isActive }}
          setters={{ setName, setDescription, setRequirementsText, setIsActive }}
          errors={errors}
          isUpdating={isUpdating}
          onAddRequirement={handleAddRequirement}
          onRequirementChange={handleRequirementChange}
          onRemoveRequirement={handleRemoveRequirement}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/procedures")}
        />

      </div>
    </div>
  );
}
