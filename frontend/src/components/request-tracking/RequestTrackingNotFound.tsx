import { SearchX } from "lucide-react";
import { Link } from "react-router-dom";

function RequestTrackingNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <SearchX size={26} />
        </div>

        <h1 className="text-lg font-semibold text-slate-900">
          Tracking information not found
        </h1>

        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          The requested tracking information does not exist or may have been removed.
        </p>

        <Link
          to="/procedures"
          className="
            mt-6 inline-flex items-center gap-2
            rounded-xl bg-[#0B2D63]
            px-5 py-2.5 text-sm font-medium text-white
            transition hover:bg-[#09224E] active:scale-[0.98]
          "
        >
          Back to Catalog
        </Link>
      </div>
    </div>
  );
}

export default RequestTrackingNotFound;