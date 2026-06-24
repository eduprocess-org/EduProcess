import { AlertTriangle, Loader2 } from "lucide-react";

interface ProcedureDeleteModalProps {
  isOpen: boolean;
  procedureName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ProcedureDeleteModal({
  isOpen,
  procedureName,
  isDeleting,
  onConfirm,
  onClose,
}: ProcedureDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl space-y-4"
        role="dialog"
        aria-modal="true"
      >
        {/* WARN HEADER */}
        <div className="flex gap-3 items-start">
          <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Delete Procedure Type</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Are you sure you want to delete <span className="font-semibold text-slate-700 dark:text-slate-200">"{procedureName}"</span>? This deployment contract parameter will be permanently removed.
            </p>
          </div>
        </div>

        {/* RISK CALLOUT */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/60">
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong>Warning:</strong> Any active or unresolved student procedures pending under this structural model might experience catalog tracking exceptions.
          </p>
        </div>

        {/* MODAL ACTIONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            {isDeleting ? "Deleting..." : "Confirm Deletion"}
          </button>
        </div>
      </div>
    </div>
  );
}