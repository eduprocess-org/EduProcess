import { useParams } from "react-router-dom";
import { RefreshCw } from "lucide-react";

import RequestTrackingHeader from "../../../components/request-tracking/RequestTrackingHeader";
import StatusTimeline from "../../../components/request-tracking/StatusTimeline";
import AdministrativeComments from "../../../components/request-tracking/AdministrativeComments";
import RequestTrackingSkeleton from "../../../components/request-tracking/RequestTrackingSkeleton";
import RequestTrackingError from "../../../components/request-tracking/RequestTrackingError";
import RequestTrackingNotFound from "../../../components/request-tracking/RequestTrackingNotFound";

import { useRequestTracking } from "../../../hooks/requests/useRequestTracking";

function RequestTrackingPage() {
  const { requestId } = useParams();

  const { tracking, loading, error, refresh } =
    useRequestTracking(requestId ?? "");

  if (loading) return <RequestTrackingSkeleton />;
  if (error) return <RequestTrackingError message={error} />;
  if (!tracking) return <RequestTrackingNotFound />;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex-1" />
        <button
          onClick={() => refresh()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <RequestTrackingHeader
        procedureName={tracking.procedureName}
        status={tracking.status}
        submissionDate={tracking.submissionDate}
        lastUpdateDate={tracking.lastUpdateDate}
      />

      <StatusTimeline timeline={tracking.timeline} />

      <AdministrativeComments comments={tracking.administrativeComments} />
    </div>
  );
}

export default RequestTrackingPage;
