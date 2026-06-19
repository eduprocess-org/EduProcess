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
} from "lucide-react";
import type { AdminRequestListItem } from "../../../types/admin/adminRequest.types";
import RequestStatusBadge from "../../../components/admin-requests/RequestStatusBadge";

interface Props {
  onStatusUpdate?: (id: string, newStatus: string) => Promise<void>;
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
      <span
        className="h-px flex-1"
        style={{ background: t.border }}
      />
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function RequestDetailsPage({ onStatusUpdate }: Props) {
  const { id: requestId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [request, setRequest] = useState<AdminRequestListItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!requestId) return;

    async function fetchRequestDetails() {
      try {
        setLoading(true);
        const mockRequest: AdminRequestListItem = {
          id: requestId!,
          studentName: "Carlos Andrés Vera",
          studentEmail: "carlos.vera@uce.edu.ec",
          procedureName: "Enrollment Certificate",
          status: "PENDING",
          career: "Ingeniería en Sistemas de Información",
          semester: "Séptimo Semestre",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
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
      setRequest({ ...request, status: nextStatus });
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="flex h-screen items-center justify-center"
        style={{ backgroundColor: t.bg }}
      >
        <div className="flex flex-col items-center gap-3">
          <RefreshCw
            size={24}
            className="animate-spin"
            style={{ color: t.blue }}
          />
          <p className="text-sm font-semibold" style={{ color: t.navyLight }}>
            Loading request details…
          </p>
        </div>
      </div>
    );
  }

  // ── Not found ────────────────────────────────────────────────────────────────
  if (!request) {
    return (
      <div
        className="flex h-screen flex-col items-center justify-center gap-3"
        style={{ backgroundColor: t.bg }}
      >
        <p className="text-sm font-semibold" style={{ color: t.navyLight }}>
          Request not found.
        </p>
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

  const isTerminal =
    request.status === "APPROVED" || request.status === "REJECTED";

  // ── Page ─────────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen px-5 pt-5 pb-12 md:px-10"
      style={{ backgroundColor: t.bg }}
    >
      <div className="mx-auto max-w-3xl space-y-5">

        {/* Back button */}
        <button
          onClick={() => navigate("/admin/requests")}
          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
          style={{ color: t.muted }}
        >
          <ArrowLeft size={14} />
          Back to Management
        </button>

        {/* ── Hero card ─────────────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-2xl border bg-white shadow-sm"
          style={{ borderColor: t.border }}
        >
          {/* Top accent stripe */}
          <div
            className="h-1 w-full"
            style={{
              background: `linear-gradient(90deg, ${t.navy} 0%, ${t.blue} 100%)`,
            }}
          />

          <div className="p-6">
            {/* ID + badge row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg"
                style={{ background: t.blueSoft, color: t.blue }}
              >
                {request.id}
              </span>
              <RequestStatusBadge status={request.status} />
            </div>

            {/* Procedure title */}
            <h1
              className="text-2xl font-extrabold tracking-tight leading-tight mb-6"
              style={{ color: t.navy }}
            >
              {request.procedureName}
            </h1>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                disabled={updating || request.status === "APPROVED"}
                onClick={() => handleAction("APPROVED")}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white rounded-xl transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "#059669" }}
                onMouseEnter={(e) =>
                  !e.currentTarget.disabled &&
                  (e.currentTarget.style.background = "#047857")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#059669")
                }
              >
                <CheckCircle2 size={14} />
                Approve Request
              </button>

              <button
                disabled={updating || request.status === "REJECTED"}
                onClick={() => handleAction("REJECTED")}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white rounded-xl transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "#DC2626" }}
                onMouseEnter={(e) =>
                  !e.currentTarget.disabled &&
                  (e.currentTarget.style.background = "#B91C1C")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#DC2626")
                }
              >
                <XCircle size={14} />
                Reject Request
              </button>
            </div>

            {/* Terminal state notice */}
            {isTerminal && (
              <p
                className="mt-3 text-xs font-medium"
                style={{ color: t.subtle }}
              >
                This request has been{" "}
                <span
                  style={{
                    color:
                      request.status === "APPROVED" ? t.emerald : t.rose,
                  }}
                >
                  {request.status.toLowerCase()}
                </span>{" "}
                and can no longer be modified.
              </p>
            )}
          </div>
        </div>

        {/* ── Student information card ───────────────────────────────────────── */}
        <div
          className="rounded-2xl border bg-white p-6 shadow-sm"
          style={{ borderColor: t.border }}
        >
          <SectionLabel>Student Information</SectionLabel>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoRow
              icon={<User size={16} style={{ color: t.blue }} />}
              label="Full Name"
              value={request.studentName}
            />
            <InfoRow
              icon={<Mail size={16} style={{ color: t.blue }} />}
              label="Institutional Email"
              value={request.studentEmail}
            />
            {request.career && (
              <InfoRow
                icon={<GraduationCap size={16} style={{ color: t.blue }} />}
                label="Career"
                value={request.career}
              />
            )}
            {request.semester && (
              <InfoRow
                icon={<BookOpen size={16} style={{ color: t.blue }} />}
                label="Semester"
                value={request.semester}
              />
            )}
          </div>
        </div>

        {/* ── Timestamps card ────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl border bg-white p-6 shadow-sm"
          style={{ borderColor: t.border }}
        >
          <SectionLabel>Activity</SectionLabel>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoRow
              icon={<CalendarDays size={16} style={{ color: t.blue }} />}
              label="Submitted"
              value={formatDate(request.createdAt)}
            />
            <InfoRow
              icon={<RefreshCw size={16} style={{ color: t.blue }} />}
              label="Last Updated"
              value={formatDate(request.updatedAt)}
            />
          </div>
        </div>

      </div>
    </div>
  );
}