import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { MessageSquare, Send, Clock, AlertCircle, RefreshCw, User } from "lucide-react";

interface Observation {
  id: string;
  authorName: string;
  role: string;
  comment: string;
  createdAt: string;
}

interface AdministrativeObservationsProps {
  requestId: string;
  // Funciones inyectadas para interactuar con la API del backend
  fetchObservationsApi: (id: string) => Promise<Observation[]>;
  submitObservationApi: (id: string, comment: string) => Promise<Observation>;
  isAdmin: boolean; 
}

const t = {
  navy:       "#0F1F4B",
  navyLight:  "#1B2B5E",
  blue:       "#2563EB",
  blueSoft:   "#EFF4FF",
  bg:         "#F0F4FA",
  border:     "#D9E3F0",
  muted:      "#64748B",
  subtle:     "#94A3B8",
  ink:        "#1E293B",
  rose:       "#DC2626",
};

export default function AdministrativeObservations({
  requestId,
  fetchObservationsApi,
  submitObservationApi,
  isAdmin,
}: AdministrativeObservationsProps) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carga inicial y refresco de observaciones asociadas al request
  const loadObservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchObservationsApi(requestId);
      // Ordenar cronológicamente (más recientes primero)
      setObservations(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch historical observations. Please try again.");
      toast.error("API Error: Could not load administrative history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (requestId) {
      loadObservations();
    }
  }, [requestId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Regla de Validación de Negocio
    if (!newComment.trim()) {
      toast.error("Validation Error: Observation text cannot be empty.");
      return;
    }

    // Control estricto de permisos del lado del cliente
    if (!isAdmin) {
      toast.error("Permission Denied: Only administrators can append feedback.");
      return;
    }

    try {
      setSubmitting(true);
      const createdObs = await submitObservationApi(requestId, newComment.trim());
      
      // Refresco inmediato del estado local insertando la respuesta atómica de la API
      setObservations((prev) => [createdObs, ...prev]);
      setNewComment("");
      toast.success("Administrative observation successfully recorded.");
    } catch (err) {
      console.error(err);
      toast.error("API Error: Failed to submit your observation.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6" style={{ borderColor: t.border }}>
      
      {/* Encabezado con acción de refresco manual */}
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: t.border }}>
        <div className="flex items-center gap-2">
          <MessageSquare size={18} style={{ color: t.blue }} />
          <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: t.navy }}>
            Administrative Observations
          </h3>
        </div>
        <button
          onClick={loadObservations}
          disabled={loading}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors disabled:opacity-50"
          title="Refresh History"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Formulario de Inserción (Protegido por Rol Administrativo) */}
      {isAdmin ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={submitting}
              placeholder="Provide constructive feedback, required corrections, or internal justifications regarding this request..."
              maxLength={1000}
              className="w-full min-h-[100px] p-3 text-sm border rounded-xl focus:outline-none focus:border-blue-500 transition-colors disabled:bg-slate-50 disabled:cursor-not-allowed"
              style={{ borderColor: t.border, color: t.ink }}
            />
            <span className="absolute bottom-2 right-3 text-[10px]" style={{ color: t.subtle }}>
              {newComment.length}/1000
            </span>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white rounded-xl bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: t.blue }}
            >
              {submitting ? <RefreshCw size={12} className="animate-spin" /> : <Send size={12} />}
              Submit Observation
            </button>
          </div>
        </form>
      ) : (
        <div className="p-3 rounded-xl border flex items-center gap-3 bg-amber-50/50" style={{ borderColor: t.border }}>
          <AlertCircle size={16} className="text-amber-600" />
          <p className="text-xs font-medium text-amber-800">
            Your current account role has read-only access to this feedback timeline.
          </p>
        </div>
      )}

      {/* Estado de carga */}
      {loading && observations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <RefreshCw size={18} className="animate-spin text-blue-600" />
          <p className="text-xs font-medium" style={{ color: t.muted }}>Loading observation timeline...</p>
        </div>
      )}

      {/* Manejo de errores de API */}
      {error && (
        <div className="p-4 rounded-xl border flex items-center gap-3 bg-red-50" style={{ borderColor: t.rose }}>
          <AlertCircle size={16} style={{ color: t.rose }} />
          <p className="text-xs font-semibold" style={{ color: t.rose }}>{error}</p>
        </div>
      )}

      {/* Listado Histórico (Timeline de Auditoría Visual) */}
      {!loading && observations.length === 0 && !error && (
        <div className="text-center py-8 border border-dashed rounded-xl" style={{ borderColor: t.border }}>
          <Clock size={24} className="mx-auto mb-2" style={{ color: t.subtle }} />
          <p className="text-xs font-medium" style={{ color: t.muted }}>No administrative observations recorded yet.</p>
        </div>
      )}

      {observations.length > 0 && (
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
          {observations.map((obs) => (
            <div
              key={obs.id}
              className="p-3 border rounded-xl bg-slate-50/50 space-y-2 transition-all hover:bg-slate-50"
              style={{ borderColor: t.border }}
            >
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 font-bold" style={{ color: t.navyLight }}>
                  <User size={12} style={{ color: t.blue }} />
                  {obs.authorName}{" "}
                  <span className="font-normal text-[10px] px-1.5 py-0.5 rounded-md bg-slate-200/80 text-slate-600 uppercase tracking-tight">
                    {obs.role}
                  </span>
                </div>
                <span style={{ color: t.subtle }}>
                  {new Date(obs.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: t.ink }}>
                {obs.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}