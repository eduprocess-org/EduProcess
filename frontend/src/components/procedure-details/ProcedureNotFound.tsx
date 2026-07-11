import { Link } from "react-router-dom";

function ProcedureNotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
        Procedure not found
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        The requested procedure does not exist.
      </p>
      <Link
        to="/procedures"
        className="mt-6 inline-flex rounded-xl bg-[#0B2D63] dark:bg-blue-700 px-5 py-3 text-white hover:bg-[#09224E] dark:hover:bg-blue-600 transition"
      >
        Back to Catalog
      </Link>
    </div>
  );
}

export default ProcedureNotFound;