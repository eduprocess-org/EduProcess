import { Save, Plus, Trash2, Loader2 } from "lucide-react";

interface ProcedureFormProps {
  formData: {
    name: string;
    description: string;
    requirements: string[];
    requirementsText: string;
    isActive: boolean;
  };
  setters: {
    setName: (v: string) => void;
    setDescription: (v: string) => void;
    setRequirementsText: (v: string) => void;
    setIsActive: (v: boolean) => void;
  };
  errors: Record<string, string>;
  isUpdating: boolean;
  onAddRequirement: () => void;
  onRequirementChange: (index: number, value: string) => void;
  onRemoveRequirement: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function ProcedureEditForm({
  formData,
  setters,
  errors,
  isUpdating,
  onAddRequirement,
  onRequirementChange,
  onRemoveRequirement,
  onSubmit,
  onCancel,
}: ProcedureFormProps) {
  return (
    <form onSubmit={onSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
      {/* NAME */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Procedure Name</span>
        <input
          type="text"
          placeholder="e.g., Degree Verification Protocol"
          value={formData.name}
          onChange={(e) => setters.setName(e.target.value)}
          className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-all"
        />
        {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Operational Description</span>
        <textarea
          rows={3}
          placeholder="Summarize the core purpose of this procedure..."
          value={formData.description}
          onChange={(e) => setters.setDescription(e.target.value)}
          className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-all resize-none"
        />
        {errors.description && <p className="text-xs text-red-500 font-medium">{errors.description}</p>}
      </div>

      {/* REQUIREMENTS TEXT */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Requirements Summary</span>
        <textarea
          rows={2}
          placeholder="Brief summary of requirements..."
          value={formData.requirementsText}
          onChange={(e) => setters.setRequirementsText(e.target.value)}
          className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-all resize-none"
        />
      </div>

      {/* REQUIREMENTS LIST */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Requirements</span>
          <button type="button" onClick={onAddRequirement} className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
            <Plus height={12} width={12} /> Add Requirement
          </button>
        </div>
        <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
          {formData.requirements.map((req, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder={`Requirement #${index + 1}`}
                value={req}
                onChange={(e) => onRequirementChange(index, e.target.value)}
                className="w-full px-4 py-1.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500 transition-all"
              />
              <button type="button" onClick={() => onRemoveRequirement(index)} className="text-slate-400 hover:text-red-500 p-1 transition-colors">
                <Trash2 height={14} width={14} />
              </button>
            </div>
          ))}
        </div>
        {errors.requirements && <p className="text-xs text-red-500 font-medium">{errors.requirements}</p>}
      </div>

      {/* STATUS */}
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status</span>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setters.setIsActive(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {formData.isActive ? "Active" : "Inactive"}
          </span>
        </label>
      </div>

      {/* FORM ACTIONS */}
      <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/60">
        <button type="button" onClick={onCancel} disabled={isUpdating} className="px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
          Cancel
        </button>
        <button type="submit" disabled={isUpdating} className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all disabled:opacity-50">
          {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save height={14} width={14} />}
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
