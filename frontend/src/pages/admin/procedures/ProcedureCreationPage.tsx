import { useNavigate } from "react-router-dom";
import { useProcedureForm } from "../../../hooks/admin/procedures/useProcedureForm";
import { InputField, TextareaField } from "../../../components/common/atoms/FormFields";
import RequirementsInput from "../../../components/procedures/admin/RequirementsInput";
import { ArrowLeft, Loader2, Save, AlertCircle } from "lucide-react";

export default function ProcedureCreationPage() {
  const navigate = useNavigate();
  const { form, setters, errors, isLoading, handleSubmit } = useProcedureForm(() => 
    navigate("/admin/procedures")
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070C19] text-slate-900 dark:text-slate-100 py-8 px-4 md:px-8 transition-colors duration-200">
      <div className="mx-auto max-w-2xl">
        
        {/* ENLACE DE REGRESO */}
        <button
          type="button"
          onClick={() => navigate("/admin/procedures")}
          disabled={isLoading}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors mb-6 uppercase tracking-wider disabled:opacity-50"
        >
          <ArrowLeft size={14} /> Back to dashboard
        </button>

        {/* TÍTULO DE LA SECCIÓN */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Create Procedure Type
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure structural baseline parameters for dynamic university protocols.
          </p>
        </div>

        {/* FORMULARIO ADAPTATIVO (CLARO / OSCURO) */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-900 p-6 md:p-8 rounded-2xl shadow-xl space-y-5 transition-colors duration-200"
        >
          {/* CONTROL DE ERRORES DEL API (Actividad: Handle API errors) */}
          {errors.api && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle size={16} className="shrink-0" />
              <div>
                <span className="font-bold">API Execution Error:</span> {errors.api}
              </div>
            </div>
          )}

          {/* CAMPO: NOMBRE (Actividad: Implement procedure name field) */}
          <InputField
            label="Procedure Name"
            value={form.name}
            onChange={(e) => setters.setName(e.target.value)}
            error={errors.name}
            disabled={isLoading}
            placeholder="e.g., Degree Verification Protocol"
          />

          {/* CAMPO: DESCRIPCIÓN (Actividad: Implement procedure description field) */}
          <TextareaField
            label="Operational Description"
            value={form.description}
            onChange={(e) => setters.setDescription(e.target.value)}
            error={errors.description}
            disabled={isLoading}
            rows={3}
            placeholder="Summarize the core purpose of this procedure..."
          />

          {/* CAMPO: REQUISITOS DINÁMICOS (Actividad: Implement requirements field) */}
          <RequirementsInput
            requirements={form.requirements}
            onChange={setters.setRequirements}
            error={errors.requirements}
            disabled={isLoading}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CAMPO: TIEMPO ESTIMADO (Actividad: Implement estimated processing time field) */}
            <InputField
              label="Estimated Processing Time"
              value={form.estimatedTime}
              onChange={(e) => setters.setEstimatedTime(e.target.value)}
              error={errors.estimatedTime}
              disabled={isLoading}
              placeholder="e.g., 5 business days"
            />

            {/* CAMPO: SELECCIÓN DE ESTADO (Actividad: Implement status selection field) */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Initial Deployment Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setters.setStatus(e.target.value as "active" | "draft")}
                disabled={isLoading}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2E] text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 cursor-pointer transition-all"
              >
                <option value="active">Active (Available to Students)</option>
                <option value="draft">Draft (System Hidden)</option>
              </select>
            </div>
          </div>

          {/* BOTONES DE ACCIÓN (Actividad: Implement loading indicators & API connections) */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-900/60">
            <button
              type="button"
              onClick={() => navigate("/admin/procedures")}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl disabled:bg-blue-700/60 dark:disabled:bg-blue-800 disabled:text-slate-200 dark:disabled:text-slate-400 transition-all shadow-md shadow-blue-500/10"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Persisting Record...
                </>
              ) : (
                <>
                  <Save size={14} /> Deploy Procedure
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}