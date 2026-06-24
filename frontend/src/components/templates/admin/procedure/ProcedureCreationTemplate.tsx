import { ArrowLeft, Loader2, Save } from "lucide-react";

interface TemplateProps {
  name: string; setName: (v: string) => void;
  description: string; setDescription: (v: string) => void;
  requirements: string; setRequirements: (v: string) => void;
  estimatedTime: string; setEstimatedTime: (v: string) => void;
  status: "active" | "inactive"; setStatus: (v: "active" | "inactive") => void;
  errors: any;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export function ProcedureCreationTemplate(props: TemplateProps) {
  return (
    <div className="min-h-screen bg-[#F1F5FB] py-8 px-4 md:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Botón de regreso */}
        <button 
          onClick={props.onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0B2D63] transition-colors mb-4 uppercase tracking-wider"
        >
          <ArrowLeft size={14} /> Back to dashboard
        </button>

        <div className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#0B2D63]">Create Procedure Type</h1>
          <p className="text-xs text-slate-400 mt-1">Register a new systemic process that students will be able to request.</p>
        </div>

        <form onSubmit={props.handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          
          {/* Campo: Nombre */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Procedure Name</label>
            <input
              type="text"
              value={props.name}
              onChange={(e) => props.setName(e.target.value)}
              placeholder="e.g., Extended Syllabus Validation"
              className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                props.errors.name ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-blue-600 focus:ring-blue-100"
              }`}
            />
            {props.errors.name && <p className="text-xs font-semibold text-red-500">{props.errors.name}</p>}
          </div>

          {/* Campo: Descripción */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description</label>
            <textarea
              value={props.description}
              onChange={(e) => props.setDescription(e.target.value)}
              placeholder="Provide a detailed operational context of the procedure..."
              rows={3}
              className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                props.errors.description ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-blue-600 focus:ring-blue-100"
              }`}
            />
            {props.errors.description && <p className="text-xs font-semibold text-red-500">{props.errors.description}</p>}
          </div>

          {/* Campo: Requerimientos (Uno por línea) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Requirements (One per line)</label>
            <textarea
              value={props.requirements}
              onChange={(e) => props.setRequirements(e.target.value)}
              placeholder="e.g., Certified Enrollment Copy&#10;Dean Approval Letter"
              rows={4}
              className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white font-mono focus:outline-none focus:ring-2 transition-all ${
                props.errors.requirements ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-blue-600 focus:ring-blue-100"
              }`}
            />
            {props.errors.requirements && <p className="text-xs font-semibold text-red-500">{props.errors.requirements}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Campo: Tiempo Estimado */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Estimated Processing Time</label>
              <input
                type="text"
                value={props.estimatedTime}
                onChange={(e) => props.setEstimatedTime(e.target.value)}
                placeholder="e.g., 5 working days"
                className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-all ${
                  props.errors.estimatedTime ? "border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-blue-600 focus:ring-blue-100"
                }`}
              />
              {props.errors.estimatedTime && <p className="text-xs font-semibold text-red-500">{props.errors.estimatedTime}</p>}
            </div>

            {/* Campo: Estado Inicial */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Initial Deployment Status</label>
              <select
                value={props.status}
                onChange={(e) => props.setStatus(e.target.value as "active" | "inactive")}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-600 transition-colors cursor-pointer"
              >
                <option value="active">Active (Available immediately)</option>
                <option value="inactive">Inactive (Draft/Hidden)</option>
              </select>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
            <button
              type="button"
              onClick={props.onBack}
              disabled={props.isLoading}
              className="px-5 py-2.5 text-sm font-bold text-slate-500 rounded-xl hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={props.isLoading}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl disabled:bg-blue-400 transition-all shadow-sm"
            >
              {props.isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save size={16} /> Save Procedure
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}