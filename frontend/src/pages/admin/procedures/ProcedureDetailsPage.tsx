import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Loader2, FileText, CheckCircle2 } from "lucide-react";
import { adminProceduresApi, type ProcedureDetail } from "../../../services/admin/procedures/procedures.service";

function AdminProcedureDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [procedure, setProcedure] = useState<ProcedureDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    adminProceduresApi.getById(id)
      .then(setProcedure)
      .catch(() => {
        toast.error("Error loading procedure details");
        navigate("/admin/procedures");
      })
      .finally(() => setIsLoading(false));
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!procedure) return null;

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={16} /> Back to procedures
      </button>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{procedure.name}</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">{procedure.description}</p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Faculty</span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{procedure.facultyName || "N/A"}</p>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Career</span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{procedure.careerName || "N/A"}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            Requirements
          </h2>
          {procedure.requirements.length > 0 ? (
            <ul className="space-y-3">
              {procedure.requirements.map((req) => (
                <li key={req.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={18} />
                  <div>
                    <span className="block font-medium text-sm text-slate-800 dark:text-slate-200">{req.name}</span>
                    <span className="text-xs text-slate-500">{req.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 italic">No requirements specified for this procedure.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProcedureDetailsPage;