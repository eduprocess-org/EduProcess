import { toast } from "sonner";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft, Mail, User, CheckCircle2, XCircle,
  GraduationCap, BookOpen, RefreshCw, FileText,
  Eye, Download, AlertTriangle, Clock,
} from "lucide-react";

import { useAdminRequestDetail }    from "../../../hooks/admin/useAdminRequestDetail";
import { useAdminRequestDocuments } from "../../../hooks/admin/useAdminRequestDocuments";
import { useAdminRequestHistory }   from "../../../hooks/admin/useAdminRequestHistory";
import { updateRequestStatus }      from "../../../services/admin/requests/adminRequest.service";
import ObservationsPanel            from "../../../components/admin-requests/ObservationsPanel";
import type { RequestStatus }       from "../../../types/admin/adminRequest.types";
import { VALID_TRANSITIONS }        from "../../../types/admin/adminRequest.types";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const tk = {
  navy:     "#0B2D63",
  navyMid:  "#1A52A8",
  blue:     "#7EB3FF",
  blueSoft: "#EFF6FF",
  emerald:  "#059669",
  emeraldBg:"#ECFDF5",
  rose:     "#DC2626",
  roseBg:   "#FEF2F2",
  amber:    "#D97706",
  amberBg:  "#FFFBEB",
  bg:       "#F1F5FB",
  white:    "#FFFFFF",
  border:   "#E2EAF4",
  muted:    "#64748B",
  subtle:   "#94A3B8",
  ink:      "#0F172A",
  inkSoft:  "#334155",
};

// ─── Status badge (inline, no external component for pending color override) ──
function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  const map: Record<string, { bg: string; color: string; label: string }> = {
    pending:  { bg: tk.amberBg,   color: tk.amber,   label: "Pending"  },
    approved: { bg: tk.emeraldBg, color: tk.emerald, label: "Approved" },
    rejected: { bg: tk.roseBg,    color: tk.rose,    label: "Rejected" },
    review:   { bg: tk.blueSoft,  color: tk.navyMid, label: "In Review"},
  };
  const style = map[s] ?? { bg: tk.bg, color: tk.muted, label: status };
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full"
          style={{ background: style.bg, color: style.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: style.color }} />
      {style.label}
    </span>
  );
}

// ─── Field row ────────────────────────────────────────────────────────────────
function Field({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-xl"
           style={{ background: tk.blueSoft }}>
        {icon}
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5"
           style={{ color: tk.subtle }}>{label}</p>
        <p className="text-sm font-semibold" style={{ color: tk.ink }}>{value}</p>
      </div>
    </div>
  );
}

// ─── Thin section divider ─────────────────────────────────────────────────────
function Sep() {
  return <div className="h-px w-full my-5" style={{ background: tk.border }} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RequestDetailsPage() {
  const { id: requestId } = useParams<{ id: string }>();
  const navigate          = useNavigate();
  const queryClient       = useQueryClient();

  const { data: detail,    isLoading: detailLoading,  error: detailError } = useAdminRequestDetail(requestId);
  const { data: documents = [], isLoading: docsLoading }   = useAdminRequestDocuments(requestId);
  const { data: history   = [], isLoading: historyLoading } = useAdminRequestHistory(requestId);

  const [updating,      setUpdating]      = useState(false);
  const [comment,       setComment]       = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<RequestStatus | null>(null);

  const loading = detailLoading || docsLoading || historyLoading;
  if (detailError) toast.error("Failed to load request.");

  const initiateStatusTransition = (nextStatus: RequestStatus) => {
    if (!detail) return;
    const cur = detail.status.toUpperCase() as RequestStatus;
    if (!(VALID_TRANSITIONS[cur] || []).includes(nextStatus)) {
      toast.error(`Cannot transition from ${cur} to ${nextStatus}.`);
      return;
    }
    setPendingStatus(nextStatus);
    setIsConfirmOpen(true);
  };

  const handleAction = async () => {
    if (!detail || !pendingStatus) return;
    setIsConfirmOpen(false);
    const target = pendingStatus.toLowerCase();
    setPendingStatus(null);
    try {
      setUpdating(true);
      await updateRequestStatus(detail.id, target, comment.trim() || undefined);
      await queryClient.invalidateQueries({ queryKey: ["adminRequestDetail", requestId] });
      await queryClient.invalidateQueries({ queryKey: ["adminRequestHistory",  requestId] });
      await queryClient.invalidateQueries({ queryKey: ["adminRequests"] });
      toast.success(`Request marked as ${target.toUpperCase()}.`);
      setComment("");
    } catch (e: any) {
      toast.error(e?.message || "Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDownload = (name: string, url: string) => {
    const a = document.createElement("a");
    a.href = url; a.setAttribute("download", name);
    document.body.appendChild(a); a.click(); a.remove();
    toast.info(`Downloading ${name}`);
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center" style={{ background: tk.bg }}>
      <div className="flex flex-col items-center gap-3">
        <RefreshCw size={20} className="animate-spin" style={{ color: tk.navyMid }} />
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: tk.subtle }}>Loading…</p>
      </div>
    </div>
  );

  if (!detail) return (
    <div className="flex h-screen flex-col items-center justify-center gap-4" style={{ background: tk.bg }}>
      <p className="text-sm font-semibold" style={{ color: tk.ink }}>Request not found.</p>
      <button onClick={() => navigate("/admin/requests")}
              className="text-xs font-bold underline underline-offset-4" style={{ color: tk.navyMid }}>
        Back to list
      </button>
    </div>
  );

  const currentStatus = detail.status.toUpperCase() as RequestStatus;
  const isTerminal    = currentStatus === "APPROVED" || currentStatus === "REJECTED";
  const fullName      = `${detail.student.firstName} ${detail.student.lastName}`.trim();

  return (
    <div className="min-h-screen py-8 px-4 md:px-8" style={{ background: tk.bg }}>
      <div className="mx-auto max-w-3xl">

        {/* Back */}
        <button onClick={() => navigate("/admin/requests")}
                className="mb-6 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest
                           transition-opacity hover:opacity-60"
                style={{ color: tk.subtle }}>
          <ArrowLeft size={12} /> Back to Requests
        </button>

        {/* ── Single card ─────────────────────────────────────────────────── */}
        <div className="rounded-3xl overflow-hidden"
             style={{
               background: tk.white,
               border: `1px solid ${tk.border}`,
               boxShadow: "0 4px 32px rgba(11,45,99,.08)",
             }}>

          {/* Card top accent */}
          <div className="h-1 w-full"
               style={{ background: `linear-gradient(90deg, ${tk.navy} 0%, ${tk.navyMid} 50%, ${tk.blue} 100%)` }} />

          <div className="p-7 md:p-9">

            {/* ── Header ──────────────────────────────────────────────── */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg"
                        style={{ background: tk.blueSoft, color: tk.navyMid }}>
                    {detail.id}
                  </span>
                  <StatusBadge status={detail.status} />
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: tk.navy }}>
                  {detail.procedureType.name}
                </h1>
                {isTerminal && (
                  <p className="text-xs" style={{ color: tk.muted }}>
                    This request has been{" "}
                    <span className="font-bold"
                          style={{ color: currentStatus === "APPROVED" ? tk.emerald : tk.rose }}>
                      {currentStatus === "APPROVED" ? "approved" : "rejected"}
                    </span>{" "}
                    and can no longer be modified.
                  </p>
                )}
              </div>

              {!isTerminal && (
                <div className="flex gap-2">
                  <button disabled={updating}
                          onClick={() => initiateStatusTransition("APPROVED")}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold
                                     rounded-xl transition-all hover:-translate-y-0.5 active:scale-95
                                     disabled:opacity-40 disabled:cursor-not-allowed text-white"
                          style={{ background: tk.emerald, boxShadow: "0 3px 12px rgba(5,150,105,.30)" }}>
                    <CheckCircle2 size={13} /> Approve
                  </button>
                  <button disabled={updating}
                          onClick={() => initiateStatusTransition("REJECTED")}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold
                                     rounded-xl transition-all hover:-translate-y-0.5 active:scale-95
                                     disabled:opacity-40 disabled:cursor-not-allowed text-white"
                          style={{ background: tk.rose, boxShadow: "0 3px 12px rgba(220,38,38,.25)" }}>
                    <XCircle size={13} /> Reject
                  </button>
                </div>
              )}
            </div>

            <Sep />

            {/* ── Body grid ─────────────────────────────────────────── */}
            <div className="grid gap-8 md:grid-cols-5">

              {/* Left: student + docs + observations + notes */}
              <div className="md:col-span-3 space-y-6">

                {/* Student info */}
                <div className="space-y-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[.18em]"
                     style={{ color: tk.subtle }}>Student</p>
                  <Field icon={<User size={13} style={{ color: tk.navyMid }} />}
                         label="Full name" value={fullName} />
                  <Field icon={<Mail size={13} style={{ color: tk.navyMid }} />}
                         label="Institutional email" value={detail.student.email} />
                  {detail.career && (
                    <Field icon={<GraduationCap size={13} style={{ color: tk.navyMid }} />}
                           label="Program" value={detail.career} />
                  )}
                  {detail.semester && (
                    <Field icon={<BookOpen size={13} style={{ color: tk.navyMid }} />}
                           label="Semester" value={detail.semester} />
                  )}
                  {detail.reason && (
                    <div className="p-3.5 rounded-xl"
                         style={{ background: tk.bg, border: `1px dashed ${tk.border}` }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1"
                         style={{ color: tk.subtle }}>Reason</p>
                      <p className="text-sm leading-relaxed" style={{ color: tk.inkSoft }}>
                        {detail.reason}
                      </p>
                    </div>
                  )}
                </div>

                <Sep />

                {/* Documents */}
                <div className="space-y-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-[.18em]"
                     style={{ color: tk.subtle }}>Documents</p>
                  {documents.length === 0 ? (
                    <p className="text-sm" style={{ color: tk.muted }}>No documents attached.</p>
                  ) : (
                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div key={doc.id}
                             className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl
                                        transition-all hover:translate-x-0.5"
                             style={{ background: tk.bg, border: `1px solid ${tk.border}` }}>
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileText size={14} style={{ color: tk.navyMid, flexShrink: 0 }} />
                            <span className="text-xs font-semibold truncate" style={{ color: tk.ink }}>
                              {doc.fileName}
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5 ml-2 flex-shrink-0">
                            <a href={doc.fileUrl} target="_blank" rel="noreferrer"
                               className="w-7 h-7 flex items-center justify-center rounded-lg
                                          transition-colors hover:bg-white"
                               style={{ color: tk.subtle }} title="Preview">
                              <Eye size={13} />
                            </a>
                            <button type="button"
                                    onClick={() => handleDownload(doc.fileName, doc.fileUrl)}
                                    className="w-7 h-7 flex items-center justify-center rounded-lg
                                               transition-colors hover:bg-white"
                                    style={{ color: tk.subtle }} title="Download">
                              <Download size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Sep />

                {/* Observations */}
                <ObservationsPanel requestId={detail.id} />

                {/* Reviewer notes */}
                {!isTerminal && (
                  <>
                    <Sep />
                    <div className="space-y-2">
                      <p className="text-[10px] font-extrabold uppercase tracking-[.18em]"
                         style={{ color: tk.subtle }}>Reviewer Notes</p>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add an internal justification or note…"
                        rows={3}
                        className="w-full p-3.5 text-sm rounded-xl resize-none focus:outline-none transition-all"
                        style={{ background: tk.bg, border: `1px solid ${tk.border}`, color: tk.ink }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = tk.navyMid;
                          e.currentTarget.style.boxShadow = `0 0 0 3px rgba(26,82,168,.08)`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = tk.border;
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Right: Audit history */}
              <div className="md:col-span-2">
                <p className="text-[10px] font-extrabold uppercase tracking-[.18em] mb-4"
                   style={{ color: tk.subtle }}>Audit History</p>

                {history.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-8">
                    <Clock size={20} style={{ color: tk.border }} />
                    <p className="text-xs" style={{ color: tk.subtle }}>No records yet.</p>
                  </div>
                ) : (
                  <div className="relative pl-4"
                       style={{ borderLeft: `2px solid ${tk.border}` }}>
                    {history.map((entry) => {
                      const isApproved = entry.newValue?.toUpperCase() === "APPROVED";
                      const isRejected = entry.newValue?.toUpperCase() === "REJECTED";
                      const dot = isApproved ? tk.emerald : isRejected ? tk.rose : tk.navyMid;
                      return (
                        <div key={entry.id} className="relative mb-5 last:mb-0">
                          <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full"
                               style={{ background: tk.white, border: `2px solid ${dot}` }} />
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider"
                                  style={{ color: dot }}>{entry.action}</span>
                            <span className="text-[10px]" style={{ color: tk.subtle }}>
                              {new Date(entry.createdAt).toLocaleDateString("en-US")}
                            </span>
                          </div>
                          <p className="text-[11px]" style={{ color: tk.muted }}>
                            by {entry.adminName}
                          </p>
                          {entry.oldValue && entry.newValue && (
                            <p className="text-[11px] mt-1 px-2 py-1 rounded-lg italic"
                               style={{ background: tk.bg, border: `1px solid ${tk.border}`, color: tk.inkSoft }}>
                              "{entry.oldValue}" → "{entry.newValue}"
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Confirm modal ───────────────────────────────────────────────────── */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ background: "rgba(11,45,99,.40)", backdropFilter: "blur(6px)" }}>
          <div className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
               style={{ background: tk.white, border: `1px solid ${tk.border}` }}>
            <div className="w-11 h-11 flex items-center justify-center rounded-2xl mb-4"
                 style={{ background: pendingStatus === "APPROVED" ? tk.emeraldBg : tk.roseBg }}>
              <AlertTriangle size={20}
                             style={{ color: pendingStatus === "APPROVED" ? tk.emerald : tk.rose }} />
            </div>
            <h3 className="text-base font-extrabold mb-1" style={{ color: tk.ink }}>
              Confirm status change
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: tk.muted }}>
              Mark this request as{" "}
              <span className="font-extrabold uppercase"
                    style={{ color: pendingStatus === "APPROVED" ? tk.emerald : tk.rose }}>
                {pendingStatus}
              </span>? This cannot be undone.
            </p>
            {comment.trim() && (
              <div className="p-3 rounded-xl text-xs italic mb-4"
                   style={{ background: tk.bg, border: `1px solid ${tk.border}`, color: tk.inkSoft }}>
                <strong>Note:</strong> "{comment}"
              </div>
            )}
            <div className="flex gap-2.5">
              <button type="button"
                      onClick={() => { setIsConfirmOpen(false); setPendingStatus(null); }}
                      className="flex-1 py-2.5 text-xs font-bold rounded-xl border transition-colors hover:bg-slate-50"
                      style={{ borderColor: tk.border, color: tk.ink }}>
                Cancel
              </button>
              <button type="button" onClick={handleAction} disabled={updating}
                      className="flex-1 py-2.5 text-xs font-extrabold text-white rounded-xl
                                 transition-all active:scale-95 disabled:opacity-50"
                      style={{
                        background: pendingStatus === "APPROVED" ? tk.emerald : tk.rose,
                        boxShadow: pendingStatus === "APPROVED"
                          ? "0 3px 12px rgba(5,150,105,.30)" : "0 3px 12px rgba(220,38,38,.25)",
                      }}>
                {updating ? "Updating…" : "Yes, confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}