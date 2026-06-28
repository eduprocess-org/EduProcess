import { ArrowLeft } from "lucide-react";
import { Divider } from "../common/atoms/Divider";
import { LoadingSpinner } from "../common/atoms/LoadingSpinner";
import { ErrorDisplay } from "../common/molecules/ErrorDisplay";
import { AuditHistory } from "../common/molecules/AuditHistory";
import { RequestDetailsHeader } from "../admin-requests/RequestDetailsHeader";
import { StudentInfoCard } from "../admin-requests/StudentInfoCard";
import { DocumentsList } from "../admin-requests/DocumentsList";
import { StatusChangeModal } from "../admin-requests/StatusChangeModal";
import ObservationsPanel from "../admin-requests/ObservationsPanel";
import type { AdminRequestDetail, RequestStatus } from "../../types/admin/adminRequest.types";

interface RequestDetailsTemplateProps {
  detail: AdminRequestDetail | undefined | null;
  documents: any[];
  history: any[];
  loading: boolean;
  error: Error | null;
  updating: boolean;
  comment: string;
  setComment: (value: string) => void;
  isConfirmOpen: boolean;
  pendingStatus: RequestStatus | null;
  initiateStatusTransition: (status: RequestStatus) => void;
  handleAction: () => void;
  handleCloseModal: () => void;
  navigateBack: () => void;
}

export function RequestDetailsTemplate({
  detail,
  documents,
  history,
  loading,
  error,
  updating,
  comment,
  setComment,
  isConfirmOpen,
  pendingStatus,
  initiateStatusTransition,
  handleAction,
  handleCloseModal,
  navigateBack,
}: RequestDetailsTemplateProps) {
  if (loading) return <LoadingSpinner />;
  if (error || !detail) {
    return <ErrorDisplay message="Request not found." backAction={navigateBack} />;
  }

  const currentStatus = detail.status.toLowerCase();
  const isTerminal = currentStatus === "approved" || currentStatus === "rejected";
  const fullName = `${detail.student.firstName} ${detail.student.lastName}`.trim();

  return (
    <div className="min-h-screen bg-[#F1F5FB] dark:bg-gray-950 py-8 px-4 md:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Back button */}
        <button
          onClick={navigateBack}
          className="mb-6 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] dark:text-slate-500 transition-opacity hover:opacity-60"
        >
          <ArrowLeft size={12} /> Back to Requests
        </button>

        {/* Main card */}
        <div className="overflow-hidden rounded-3xl border border-[#E2EAF4] dark:border-gray-700 bg-white dark:bg-gray-900 shadow-[0_4px_32px_rgba(11,45,99,.08)] dark:shadow-none">
          {/* Accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#0B2D63] via-[#1A52A8] to-[#7EB3FF]" />

          <div className="p-7 md:p-9">
            <RequestDetailsHeader
              id={detail.id}
              title={detail.procedureType.name}
              status={detail.status}
              isTerminal={isTerminal}
              currentStatus={currentStatus}
              updating={updating}
              onStartReview={() => initiateStatusTransition("in_review")}
              onApprove={() => initiateStatusTransition("approved")}
              onReject={() => initiateStatusTransition("rejected")}
            />

            <Divider />

            <div className="grid gap-8 md:grid-cols-5">
              {/* Left column */}
              <div className="space-y-6 md:col-span-3">
                <StudentInfoCard
                  fullName={fullName}
                  email={detail.student.email}
                  career={detail.career}
                  semester={detail.semester}
                  reason={detail.reason}
                />

                <Divider />

                <div className="space-y-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#94A3B8] dark:text-slate-500">
                    Documents
                  </p>
                  <DocumentsList documents={documents} />
                </div>

                <Divider />

                <ObservationsPanel requestId={detail.id} />

                {!isTerminal && (
                  <>
                    <Divider />
                    <div className="space-y-2">
                      <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#94A3B8] dark:text-slate-500">
                        Reviewer Notes
                      </p>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add an internal justification or note…"
                        rows={3}
                        className="
                          w-full resize-none rounded-xl p-3.5 text-sm
                          border border-[#E2EAF4] dark:border-gray-600
                          bg-[#F1F5FB] dark:bg-gray-800
                          text-[#0F172A] dark:text-slate-200
                          placeholder:text-slate-400 dark:placeholder:text-slate-500
                          transition-all focus:outline-none
                          focus:border-[#1A52A8] dark:focus:border-blue-400
                          focus:shadow-[0_0_0_3px_rgba(26,82,168,.08)] dark:focus:shadow-[0_0_0_3px_rgba(96,165,250,0.12)]
                        "
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Right column — Audit */}
              <div className="md:col-span-2">
                <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#94A3B8] dark:text-slate-500">
                  Audit History
                </p>
                <AuditHistory history={history} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <StatusChangeModal
        isOpen={isConfirmOpen}
        pendingStatus={pendingStatus}
        comment={comment}
        updating={updating}
        onConfirm={handleAction}
        onCancel={handleCloseModal}
      />
    </div>
  );
}