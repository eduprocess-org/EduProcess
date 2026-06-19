import { useParams } from "react-router-dom";

import RequestTrackingHeader from "../../../components/request-tracking/RequestTrackingHeader";
import StatusTimeline from "../../../components/request-tracking/StatusTimeline";
import AdministrativeComments from "../../../components/request-tracking/AdministrativeComments";
import RequestTrackingSkeleton from "../../../components/request-tracking/RequestTrackingSkeleton";
import RequestTrackingError from "../../../components/request-tracking/RequestTrackingError";
import RequestTrackingNotFound from "../../../components/request-tracking/RequestTrackingNotFound";

import { useRequestTracking } from "../../../hooks/requests/useRequestTracking";

function RequestTrackingPage() {
  const { requestId } = useParams();

const { tracking, loading, error } =
  useRequestTracking(requestId ?? "");
  
  if (loading) return <RequestTrackingSkeleton />;
  if (error) return <RequestTrackingError message={error} />;
  if (!tracking) return <RequestTrackingNotFound />;

  return (
    <div className="space-y-5">
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
