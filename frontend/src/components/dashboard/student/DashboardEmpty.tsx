import { FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashboardEmpty() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white py-16 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <FolderOpen size={26} />
      </div>

      <h2 className="mt-4 text-base font-semibold text-slate-800">
        No Requests Found
      </h2>

      <p className="mt-1.5 max-w-xs text-sm text-slate-500">
        You have not submitted any procedure requests yet.
      </p>

      <button
        onClick={() => navigate("/procedures")}
        className="
          mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0B2D63]
          px-5 py-2.5 text-sm font-medium text-white
          transition hover:bg-[#09224E] active:scale-[0.98]
        "
      >
        Browse Procedures
      </button>
    </div>
  );
}

export default DashboardEmpty;
