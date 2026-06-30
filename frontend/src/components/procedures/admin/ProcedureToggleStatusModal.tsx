import { AlertTriangle, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  procedureName: string;
  isActive: boolean;
  isToggling: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

function ProcedureToggleStatusModal({ 
  isOpen, 
  procedureName, 
  isActive, 
  isToggling, 
  onConfirm, 
  onClose 
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-800 animate-in fade-in zoom-in duration-200">
        
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${isActive ? 'bg-amber-100' : 'bg-emerald-100'}`}>
              <AlertTriangle className={`h-6 w-6 ${isActive ? 'text-amber-600' : 'text-emerald-600'}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {isActive ? "Disable Procedure" : "Enable Procedure"}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Are you sure you want to {isActive ? "deactivate" : "activate"} the procedure:
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
            "{procedureName}"
          </p>
        </div>

        <div className="flex gap-3 bg-slate-50 dark:bg-slate-900/30 px-6 py-4">
          <button
            onClick={onClose}
            disabled={isToggling}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isToggling}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all ${
              isActive 
                ? "bg-amber-600 hover:bg-amber-700 shadow-amber-950/20" 
                : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-950/20"
            } shadow-md active:scale-95`}
          >
            {isToggling ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              isActive ? "Disable Procedure" : "Enable Procedure"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProcedureToggleStatusModal;