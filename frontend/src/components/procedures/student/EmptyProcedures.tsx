import { FileSearch } from "lucide-react";

function EmptyProcedures() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <FileSearch
        size={60}
        className="text-slate-400"
      />

      <h3 className="mt-4 text-xl font-semibold text-slate-700">
        No Procedures Available
      </h3>

      <p className="mt-2 text-slate-500">
        There are currently no academic procedures available.
      </p>
    </div>
  );
}

export default EmptyProcedures;