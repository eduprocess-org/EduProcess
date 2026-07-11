import type { Faculty, CareerWithFaculty } from "../../../services/admin/procedures/procedures.service";

interface ProcedureScopeSelectorProps {
  isSpecific: boolean;
  onToggle: (v: boolean) => void;
  facultyId: string;
  onFacultyChange: (v: string) => void;
  careerId: string;
  onCareerChange: (v: string) => void;
  faculties: Faculty[];
  filteredCareers: CareerWithFaculty[];
  disabled?: boolean;
}

export default function ProcedureScopeSelector({
  isSpecific,
  onToggle,
  facultyId,
  onFacultyChange,
  careerId,
  onCareerChange,
  faculties,
  filteredCareers,
  disabled = false,
}: ProcedureScopeSelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        Procedure Scope
      </span>

      {/* Two radio options */}
      <div className="flex gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            onToggle(false);
            onFacultyChange("");
            onCareerChange("");
          }}
          className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
            !isSpecific
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 shadow-sm"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          General
          <span className="block text-[11px] font-normal mt-0.5 opacity-70">All students</span>
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onToggle(true)}
          className={`flex-1 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
            isSpecific
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 shadow-sm"
              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Specific
          <span className="block text-[11px] font-normal mt-0.5 opacity-70">Faculty / Career</span>
        </button>
      </div>

      {/* Dropdowns — disabled when General */}
      <div className={`flex flex-col gap-3 transition-opacity ${isSpecific ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Faculty
          </span>
          <select
            value={facultyId}
            onChange={(e) => {
              onFacultyChange(e.target.value);
              onCareerChange("");
            }}
            disabled={disabled || !isSpecific}
            className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2E] text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            <option value="">Select a faculty...</option>
            {faculties.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Career (Optional)
          </span>
          <select
            value={careerId}
            onChange={(e) => onCareerChange(e.target.value)}
            disabled={disabled || !isSpecific || !facultyId}
            className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2E] text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            <option value="">{facultyId ? "All careers in faculty..." : "Select a faculty first..."}</option>
            {filteredCareers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
