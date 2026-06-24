import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function ProceduresSearch({ value, onChange }: Props) {
  return (
    <div className="relative w-full group">

      <Search
        size={16}
        className="
          absolute left-3.5 top-1/2 -translate-y-1/2
          text-slate-400 transition-colors
          group-focus-within:text-indigo-500
        "
      />

      <input
        type="text"
        placeholder="Search by name, code or description…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-10
          w-full
          rounded-lg
          border
          border-slate-200
          bg-white
          py-0
          pl-9
          pr-9
          text-sm
          text-slate-800
          placeholder:text-slate-400
          shadow-sm
          outline-none
          transition-all
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-100
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-100
          dark:placeholder:text-slate-500
          dark:focus:border-indigo-500
          dark:focus:ring-indigo-900/40
        "
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            rounded p-0.5
            text-slate-400
            hover:text-slate-600
            dark:hover:text-slate-200
            transition-colors
          "
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}

    </div>
  );
}

export default ProceduresSearch;