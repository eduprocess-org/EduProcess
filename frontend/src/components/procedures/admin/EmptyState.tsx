import { FileSearch } from "lucide-react";

function EmptyState() {

  return (

    <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center dark:border-slate-700 dark:bg-slate-900">

      <div className="flex justify-center">

        <div className="rounded-full bg-slate-100 p-5 dark:bg-slate-800">

          <FileSearch
            size={40}
            className="text-slate-500"
          />

        </div>

      </div>

      <h3 className="mt-6 text-xl font-semibold dark:text-white">
        No procedures found
      </h3>

      <p className="mt-2 text-slate-500">
        Try changing the search term or filters.
      </p>

    </div>

  );
}

export default EmptyState;