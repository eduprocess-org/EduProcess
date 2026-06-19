import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { MessageSquare, Send, Clock, RefreshCw, User, Trash2 } from "lucide-react";
import { apiClient } from "../../services/api/apiClient";

interface ObservationsPanelProps {
  requestId: string;
}

interface Observation {
  id: string;
  adminName: string;
  comment: string;
  createdAt: string;
}

const t = {
  navy: "#0F1F4B",
  navyLight: "#1B2B5E",
  blue: "#2563EB",
  border: "#D9E3F0",
  muted: "#64748B",
  subtle: "#94A3B8",
  ink: "#1E293B",
};

export default function ObservationsPanel({ requestId }: ObservationsPanelProps) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // 1. Obtener observaciones - Alineado a contrato 2.2 (/api/v1/admin/requests/:requestId/observations)
  const fetchObservations = async () => {
    if (!requestId) return;
    setIsLoading(true);
    try {
      // Usamos la ruta completa según la guía (el apiClient debe tener baseURL: /api/v1)
      const response = await apiClient.get(`/admin/requests/${requestId}/observations`);
      setObservations(response.data.data || []); // La guía especifica que viene en data.data
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.status === 401 ? "Sesión expirada" : "Error al cargar observaciones.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchObservations();
  }, [requestId]);

  // 2. Crear observación - Alineado a contrato 2.1
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      await apiClient.post(`/admin/requests/${requestId}/observations`, { 
        comment: comment.trim() 
      });
      setComment("");
      toast.success("Observación registrada con éxito.");
      fetchObservations(); 
    } catch (error) {
      console.error(error);
      toast.error("Error al registrar la observación.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Eliminar observación - Alineado a contrato 2.4
  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Eliminar esta observación permanentemente?")) return;

    setIsDeletingId(id);
    try {
      await apiClient.delete(`/admin/observations/${id}`);
      toast.success("Observación eliminada.");
      fetchObservations();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar.");
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6" style={{ borderColor: t.border }}>
      {/* Encabezado */}
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: t.border }}>
        <div className="flex items-center gap-2">
          <MessageSquare size={18} style={{ color: t.blue }} />
          <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: t.navy }}>Observaciones</h3>
        </div>
        <button onClick={fetchObservations} disabled={isLoading} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
          <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isSubmitting}
          placeholder="Escribir observación..."
          className="w-full min-h-[80px] p-3 text-sm border rounded-xl focus:border-blue-500 transition-colors"
          style={{ borderColor: t.border }}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="px-4 py-2 text-xs font-bold text-white rounded-xl bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Agregar Observación"}
          </button>
        </div>
      </form>

      {/* Listado */}
      {isLoading ? (
        <div className="text-center py-4 text-xs">Cargando...</div>
      ) : observations.length === 0 ? (
        <div className="text-center py-6 text-xs text-slate-400">No hay observaciones.</div>
      ) : (
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {observations.map((obs) => (
            <div key={obs.id} className="p-3 border rounded-xl bg-slate-50/50 relative group" style={{ borderColor: t.border }}>
              <div className="flex justify-between text-[10px] mb-1 font-bold text-slate-500">
                <span>{obs.adminName} (Evaluador)</span>
                <span>{new Date(obs.createdAt).toLocaleString("es-EC")}</span>
              </div>
              <p className="text-xs text-slate-800">{obs.comment}</p>
              <button 
                onClick={() => handleDelete(obs.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}