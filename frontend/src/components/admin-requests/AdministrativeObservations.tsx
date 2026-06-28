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
  fetchObservationsApi: (id: string) => Promise<Observation[]>;
  submitObservationApi: (id: string, comment: string) => Promise<Observation>;
  isAdmin: boolean;
}

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

  const loadObservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchObservationsApi(requestId);
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
    if (requestId) loadObservations();
  }, [requestId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Validation Error: Observation text cannot be empty.");
      return;
    }
    if (!isAdmin) {
      toast.error("Permission Denied: Only administrators can append feedback.");
      return;
    }
    try {
      setSubmitting(true);
      const createdObs = await submitObservationApi(requestId, newComment.trim());
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
    <div className="rounded-2xl border border-[#D9E3F0] dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm dark:shadow-none space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D9E3F0] dark:border-gray-700 pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-[#2563EB] dark:text-blue-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1F4B] dark:text-blue-200">
            Administrative Observations
          </h3>
        </div>
        <button
          onClick={loadObservations}
          disabled={loading}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-700 text-slate-500 dark:text-slate-400 transition-colors disabled:opacity-50"
          title="Refresh History"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Form (admin only) */}
      {isAdmin ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={submitting}
              placeholder="Provide constructive feedback, required corrections, or internal justifications regarding this request..."
              maxLength={1000}
              className="
                w-full min-h-[100px] p-3 text-sm rounded-xl
                border border-[#D9E3F0] dark:border-gray-600
                bg-white dark:bg-gray-800
                text-[#1E293B] dark:text-slate-200
                placeholder:text-slate-400 dark:placeholder:text-slate-500
                focus:outline-none focus:border-blue-500 dark:focus:border-blue-400
                disabled:bg-slate-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed
                transition-colors
              "
            />
            <span className="absolute bottom-2 right-3 text-[10px] text-[#94A3B8] dark:text-slate-500">
              {newComment.length}/1000
            </span>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white rounded-xl bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? <RefreshCw size={12} className="animate-spin" /> : <Send size={12} />}
              Submit Observation
            </button>
          </div>
        </form>
      ) : (
        <div className="p-3 rounded-xl border border-[#D9E3F0] dark:border-amber-800/40 flex items-center gap-3 bg-amber-50/50 dark:bg-amber-900/20">
          <AlertCircle size={16} className="text-amber-600 dark:text-amber-400" />
          <p className="text-xs font-medium text-amber-800 dark:text-amber-300">
            Your current account role has read-only access to this feedback timeline.
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && observations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <RefreshCw size={18} className="animate-spin text-blue-600 dark:text-blue-400" />
          <p className="text-xs font-medium text-[#64748B] dark:text-slate-400">Loading observation timeline...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl border border-[#DC2626] dark:border-red-700 flex items-center gap-3 bg-red-50 dark:bg-red-950/40">
          <AlertCircle size={16} className="text-[#DC2626] dark:text-red-400" />
          <p className="text-xs font-semibold text-[#DC2626] dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && observations.length === 0 && !error && (
        <div className="text-center py-8 border border-dashed border-[#D9E3F0] dark:border-gray-600 rounded-xl">
          <Clock size={24} className="mx-auto mb-2 text-[#94A3B8] dark:text-slate-500" />
          <p className="text-xs font-medium text-[#64748B] dark:text-slate-400">No administrative observations recorded yet.</p>
        </div>
      )}

      {/* Timeline */}
      {observations.length > 0 && (
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
          {observations.map((obs) => (
            <div
              key={obs.id}
              className="p-3 border border-[#D9E3F0] dark:border-gray-700 rounded-xl bg-slate-50/50 dark:bg-gray-800/60 space-y-2 transition-all hover:bg-slate-50 dark:hover:bg-gray-800"
            >
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 font-bold text-[#1B2B5E] dark:text-blue-200">
                  <User size={12} className="text-[#2563EB] dark:text-blue-400" />
                  {obs.authorName}{" "}
                  <span className="font-normal text-[10px] px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-gray-700 text-slate-600 dark:text-slate-300 uppercase tracking-tight">
                    {obs.role}
                  </span>
                </div>
                <span className="text-[#94A3B8] dark:text-slate-500">
                  {new Date(obs.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-xs leading-relaxed whitespace-pre-wrap text-[#1E293B] dark:text-slate-300">
                {obs.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}