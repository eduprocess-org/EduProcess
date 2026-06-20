import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { MessageSquare, RefreshCw, Trash2, Send } from "lucide-react";
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

const tk = {
  navy:    "#0B2D63",
  navyMid: "#1A52A8",
  blue:    "#7EB3FF",
  blueSoft:"#EFF6FF",
  border:  "#E2EAF4",
  bg:      "#F1F5FB",
  muted:   "#64748B",
  subtle:  "#94A3B8",
  ink:     "#0F172A",
  inkSoft: "#334155",
  rose:    "#DC2626",
  white:   "#FFFFFF",
};

const PANEL_STYLE = `
  @keyframes obs-in {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .obs-entry { animation: obs-in .22s ease both; }
  .obs-entry:hover .obs-delete { opacity: 1; }
  .obs-delete { opacity: 0; transition: opacity .15s; }
  .obs-textarea:focus { outline: none; }
`;

export default function ObservationsPanel({ requestId }: ObservationsPanelProps) {
  const [observations, setObservations] = useState<Observation[]>([]);
  const [comment,      setComment]      = useState("");
  const [isLoading,    setIsLoading]    = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const fetchObservations = async () => {
    if (!requestId) return;
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/admin/requests/${requestId}/observations`);
      setObservations(response.data.data || []);
    } catch (error: any) {
      toast.error(error.response?.status === 401 ? "Session expired." : "Failed to load observations.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchObservations(); }, [requestId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setIsSubmitting(true);
    try {
      await apiClient.post(`/admin/requests/${requestId}/observations`, { comment: comment.trim() });
      setComment("");
      toast.success("Observation added.");
      fetchObservations();
    } catch {
      toast.error("Failed to add observation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this observation permanently?")) return;
    setIsDeletingId(id);
    try {
      await apiClient.delete(`/admin/observations/${id}`);
      toast.success("Observation deleted.");
      fetchObservations();
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <>
      <style>{PANEL_STYLE}</style>

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={14} style={{ color: tk.navyMid }} />
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em]"
               style={{ color: tk.subtle }}>
              Observations
            </p>
            {observations.length > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: tk.blueSoft, color: tk.navyMid }}>
                {observations.length}
              </span>
            )}
          </div>
          <button onClick={fetchObservations} disabled={isLoading}
                  className="w-6 h-6 flex items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
                  style={{ color: tk.subtle }}>
            <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Compose */}
        <form onSubmit={handleSubmit}>
          <div className="rounded-xl overflow-hidden transition-all"
               style={{ border: `1px solid ${tk.border}`, background: tk.bg }}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isSubmitting}
              placeholder="Write an observation…"
              rows={2}
              className="obs-textarea w-full p-3 text-sm bg-transparent resize-none"
              style={{ color: tk.ink }}
              onFocus={(e) => {
                const wrap = e.currentTarget.closest("div") as HTMLElement;
                if (wrap) { wrap.style.borderColor = tk.navyMid; wrap.style.boxShadow = `0 0 0 3px rgba(26,82,168,.08)`; }
              }}
              onBlur={(e) => {
                const wrap = e.currentTarget.closest("div") as HTMLElement;
                if (wrap) { wrap.style.borderColor = tk.border; wrap.style.boxShadow = "none"; }
              }}
            />
            <div className="flex justify-end px-2.5 py-2"
                 style={{ borderTop: `1px solid ${tk.border}` }}>
              <button type="submit"
                      disabled={isSubmitting || !comment.trim()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-bold
                                 text-white rounded-lg transition-all active:scale-95 disabled:opacity-40"
                      style={{ background: tk.navyMid, boxShadow: "0 2px 8px rgba(26,82,168,.25)" }}>
                <Send size={11} />
                {isSubmitting ? "Sending…" : "Add Note"}
              </button>
            </div>
          </div>
        </form>

        {/* List */}
        {isLoading ? (
          <div className="flex justify-center py-6">
            <RefreshCw size={16} className="animate-spin" style={{ color: tk.subtle }} />
          </div>
        ) : observations.length === 0 ? (
          <div className="flex flex-col items-center gap-1.5 py-6">
            <MessageSquare size={18} style={{ color: tk.border }} />
            <p className="text-xs" style={{ color: tk.subtle }}>No observations yet.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-0.5">
            {observations.map((obs, i) => (
              <div key={obs.id}
                   className="obs-entry relative p-3 rounded-xl group"
                   style={{
                     background: tk.white,
                     border: `1px solid ${tk.border}`,
                     animationDelay: `${i * 40}ms`,
                   }}>
                {/* Meta row */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white"
                         style={{ background: tk.navyMid }}>
                      {obs.adminName.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[10px] font-bold" style={{ color: tk.inkSoft }}>
                      {obs.adminName}
                    </span>
                  </div>
                  <span className="text-[10px]" style={{ color: tk.subtle }}>
                    {new Date(obs.createdAt).toLocaleString("en-US", {
                      month: "short", day: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs leading-relaxed pr-5" style={{ color: tk.inkSoft }}>
                  {obs.comment}
                </p>

                {/* Delete */}
                <button onClick={() => handleDelete(obs.id)}
                        disabled={isDeletingId === obs.id}
                        className="obs-delete absolute top-2.5 right-2.5 w-5 h-5 flex items-center
                                   justify-center rounded-md transition-colors hover:bg-red-50 disabled:opacity-40"
                        style={{ color: tk.rose }}>
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}