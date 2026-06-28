import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

function ProceduresPagination({
  page,
  totalPages,
  totalItems,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show at most 5 page numbers centered on the current page
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    return pages.slice(Math.max(0, end - 5), end);
  };

  const visiblePages = getVisiblePages();

  const btnBase = `
    inline-flex items-center justify-center h-9 min-w-[2.25rem] rounded-lg
    text-sm font-medium transition-all duration-150 select-none
  `;

  const btnDefault = `
    ${btnBase}
    border border-slate-200 bg-white text-slate-600 px-2
    hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700
    dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300
    dark:hover:border-indigo-600 dark:hover:bg-indigo-950 dark:hover:text-indigo-300
    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white
    dark:disabled:hover:bg-slate-900
  `;

  const btnActive = `
    ${btnBase}
    bg-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-950
    hover:bg-indigo-700 cursor-default
  `;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-1">

      <p className="text-xs text-slate-400 dark:text-slate-500">
        Showing page{" "}
        <span className="font-semibold text-slate-600 dark:text-slate-300">{page}</span>
        {" "}of{" "}
        <span className="font-semibold text-slate-600 dark:text-slate-300">{totalPages}</span>
        {" "}—{" "}
        <span className="font-semibold text-slate-600 dark:text-slate-300">{totalItems}</span>
        {" "}procedures total
      </p>

      <div className="flex items-center gap-1">

        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={`${btnDefault} px-2`}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {visiblePages[0] > 1 && (
          <>
            <button onClick={() => onPageChange(1)} className={btnDefault + " w-9"}>1</button>
            {visiblePages[0] > 2 && (
              <span className="px-1 text-slate-400 text-sm select-none">…</span>
            )}
          </>
        )}

        {visiblePages.map((p) => (
          <button
            key={p}
            onClick={() => p !== page && onPageChange(p)}
            className={p === page ? btnActive + " w-9" : btnDefault + " w-9"}
          >
            {p}
          </button>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-1 text-slate-400 text-sm select-none">…</span>
            )}
            <button onClick={() => onPageChange(totalPages)} className={btnDefault + " w-9"}>
              {totalPages}
            </button>
          </>
        )}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className={`${btnDefault} px-2`}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>

      </div>

    </div>
  );
}

export default ProceduresPagination;