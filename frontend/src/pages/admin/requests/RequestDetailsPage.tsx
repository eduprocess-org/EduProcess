import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  User,
  CheckCircle2,
  XCircle,
  GraduationCap,
  BookOpen,
  CalendarDays,
  RefreshCw,
  FileText,
  Eye,
  Download,
} from "lucide-react";
import type { AdminRequestListItem } from "../../../types/admin/adminRequest.types";
import RequestStatusBadge from "../../../components/admin-requests/RequestStatusBadge";

interface Props {
  onStatusUpdate?: (id: string, newStatus: string) => Promise<void>;
}

// Interfaz extendida para el flujo completo de auditoría y archivos adjuntos
interface DetailedAdminRequest extends AdminRequestListItem {
  documents: Array<{ id: string; name: string; url: string }>;
  history: Array<{ status: string; user: string; comment?: string; date: string }>;
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const t = {
  navy:       "#0F1F4B",
  navyLight:  "#1B2B5E",
  blue:       "#2563EB",
  blueSoft:   "#EFF4FF",
  emerald:    "#059669",
  rose:       "#DC2626",
  bg:         "#F0F4FA",
  surface:    "#FFFFFF",
  border:     "#D9E3F0",
  muted:      "#64748B",
  subtle:     "#94A3B8",
  ink:        "#1E293B",
};

// ─── Small reusable pieces ────────────────────────────────────────────────────
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="mt-0.5 flex-shrink-0 p-2 rounded-xl"
        style={{ background: t.blueSoft, border: `1px solid ${t.border}` }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: t.subtle }}>
          {label}
        </p>
        <p className="text-sm font-medium truncate" style={{ color: t.ink }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="h-px flex-1" style={{ background: t.border }} />
      <p
        className="text-[11px] font-bold uppercase tracking-widest flex-shrink-0"
        style={{ color: t.subtle }}
      >
        {children}
      </p>
      <span className="h-px flex-1" style={{ background: t.border }} />
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function RequestDetailsPage({ onStatusUpdate }: Props) {
  const { id: requestId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [request, setRequest] = useState<DetailedAdminRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!requestId) return;

    async function fetchRequestDetails() {
      try {
        setLoading(true);
        // Simulación de delay e integración de mock estructurado atómicamente
        await new Promise((res) => setTimeout(res, 400));

        const mockRequest: DetailedAdminRequest = {
          id: requestId!,
          studentName: "Carlos Andrés Vera",
          studentEmail: "carlos.vera@uce.edu.ec",
          procedureName: "Enrollment Certificate",
          status: "PENDING",
          career: "Ingeniería en Sistemas de Información",
          semester: "Séptimo Semestre",
          createdAt: "2026-06-18T14:30:00Z",
          updatedAt: "2026-06-18T14:32:00Z",
          documents: [
            { id: "doc-1", name: "Comprobante_Pago_Aranceles.pdf", url: "#" },
            { id: "doc-2", name: "Cedula_Identidad_Escaneada.pdf", url: "#" },
          ],
          history: [
            { status: "EN REVISIÓN", user: "Sistema", comment: "Automatic assignment to admin tray", date: "2026-06-18T14:32:00Z" },
            { status: "CREADA", user: "Carlos Andrés Vera", comment: "Initial application successfully submitted", date: "2026-06-18T14:30:00Z" }
          ]
        };
        setRequest(mockRequest);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRequestDetails();
  }, [requestId]);

  const handleAction = async (nextStatus: "APPROVED" | "REJECTED") => {
    if (!request) return;
    try {
      setUpdating(true);
      if (onStatusUpdate) {
        await onStatusUpdate(request.id, nextStatus);
      }
      
      const newHistoryItem = {
        status: nextStatus,
        user: "Coordinador Administrador",
        comment: comment.trim() ? comment.trim() : `Procedure marked as ${nextStatus.toLowerCase()}`,
        date: new Date().toISOString()
      };

      setRequest({ 
        ...request, 
        status: nextStatus,
        history: [newHistoryItem, ...request.history]
      });
      setComment("");
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDownload = (name: string, url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: t.bg }}>
        <div className="flex flex-col items-center gap-3">
          <RefreshCw size={24} className="animate-spin" style={{ color: t.blue }} />
          <p className="text-sm font-semibold" style={{ color: t.navyLight }}>
            Loading request details…
          </p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3" style={{ backgroundColor: t.bg }}>
        <p className="text-sm font-semibold" style={{ color: t.navyLight }}>Request not found.</p>
        <button
          onClick={() => navigate("/admin/requests")}
          className="text-xs font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
          style={{ color: t.blue }}
        >
          Back to Management
        </button>
      </div>
    );
  }

  const isTerminal = request.status === "APPROVED" || request.status === "REJECTED";

  return (
    <div className="min-h-screen px-5 pt-5 pb-12 md:px-10" style={{ backgroundColor: t.bg }}>
      <div className="mx-auto max-w-4xl space-y-5">

        {/* Back button */}
        <button
          onClick={() => navigate("/admin/requests")}
          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
          style={{ color: t.muted }}
        >
          <ArrowLeft size={14} /> Back to Management
        </button>

        {/* ── Hero card ─────────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm" style={{ borderColor: t.border }}>
          <div
            className="h-1 w-full"
            style={{ background: `linear-gradient(90deg, ${t.navy} 0%, ${t.blue} 100%)` }}
          />

          <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg" style={{ background: t.blueSoft, color: t.blue }}>
                    {request.id}
                  </span>
                  <RequestStatusBadge status={request.status} />
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight leading-tight" style={{ color: t.navy }}>
                  {request.procedureName}
                </h1>
              </div>

              {!isTerminal && (
                <div className="flex flex-wrap gap-2">
                  <button
                    disabled={updating}
                    onClick={() => handleAction("APPROVED")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white rounded-xl transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: t.emerald }}
                    onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = "#047857")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = t.emerald)}
                  >
                    <CheckCircle2 size={14} /> Approve Request
                  </button>
                  <button
                    disabled={updating}
                    onClick={() => handleAction("REJECTED")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white rounded-xl transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: t.rose }}
                    onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = "#B91C1C")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = t.rose)}
                  >
                    <XCircle size={14} /> Reject Request
                  </button>
                </div>
              )}
            </div>

            {isTerminal && (
              <p className="mt-3 text-xs font-medium" style={{ color: t.subtle }}>
                This request has been{" "}
                <span style={{ color: request.status === "APPROVED" ? t.emerald : t.rose }}>
                  {request.status.toLowerCase()}
                </span>{" "}
                and can no longer be modified.
              </p>
            )}
          </div>
        </div>

        {/* ── Layout Grid ───────────────────────────────────────────────────── */}
        <div className="grid gap-5 md:grid-cols-3">
          
          {/* Main sections */}
          <div className="space-y-5 md:col-span-2">
            
            {/* Student information card */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm" style={{ borderColor: t.border }}>
              <SectionLabel>Student Information</SectionLabel>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoRow icon={<User size={16} style={{ color: t.blue }} />} label="Full Name" value={request.studentName} />
                <InfoRow icon={<Mail size={16} style={{ color: t.blue }} />} label="Institutional Email" value={request.studentEmail} />
                {request.career && <InfoRow icon={<GraduationCap size={16} style={{ color: t.blue }} />} label="Career" value={request.career} />}
                {request.semester && <InfoRow icon={<BookOpen size={16} style={{ color: t.blue }} />} label="Semester" value={request.semester} />}
              </div>
            </div>

            {/* Document list visualization card */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm" style={{ borderColor: t.border }}>
              <SectionLabel>Uploaded Documents</SectionLabel>
              <div className="space-y-2.5">
                {request.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl border border-dashed transition-colors hover:bg-slate-50" style={{ borderColor: t.border }}>
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText size={18} style={{ color: t.blue }} />
                      <span className="text-sm font-medium truncate" style={{ color: t.ink }}>{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <a href={doc.url} target="_blank" rel="noreferrer" className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" title="Preview">
                        <Eye size={15} />
                      </a>
                      <button type="button" onClick={() => handleDownload(doc.name, doc.url)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" title="Download">
                        <Download size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resolution Comment Area */}
            {!isTerminal && (
              <div className="rounded-2xl border bg-white p-6 shadow-sm" style={{ borderColor: t.border }}>
                <SectionLabel>Reviewer Resolutions & Comments</SectionLabel>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add an internal justification or observation regarding this academic decision.."
                  className="w-full min-h-[90px] p-3 text-sm border rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  style={{ borderColor: t.border, color: t.ink }}
                />
              </div>
            )}
          </div>

          {/* Sidebar Audit History Timeline */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm h-fit" style={{ borderColor: t.border }}>
            <SectionLabel>Audit History</SectionLabel>
            <div className="relative pl-4 border-l space-y-5" style={{ borderColor: t.border }}>
              {request.history.map((log, index) => (
                <div key={index} className="relative space-y-1">
                  {/* Timeline indicator node */}
                  <div className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-white border-2" 
                       style={{ borderColor: log.status === "APPROVED" ? t.emerald : log.status === "REJECTED" ? t.rose : t.blue }} />
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                    <span style={{ color: log.status === "APPROVED" ? t.emerald : log.status === "REJECTED" ? t.rose : t.navyLight }}>
                      {log.status}
                    </span>
                    <span style={{ color: t.subtle }}>{new Date(log.date).toLocaleDateString("es-EC")}</span>
                  </div>
                  <p className="text-[11px] font-medium" style={{ color: t.muted }}>por {log.user}</p>
                  {log.comment && (
                    <p className="text-xs p-2 rounded-lg bg-slate-50 border italic mt-1" style={{ borderColor: t.border, color: t.ink }}>
                      "{log.comment}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}