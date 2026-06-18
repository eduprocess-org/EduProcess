function ProceduresSkeleton() {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="
            animate-pulse
            rounded-xl
            border
            border-slate-200
            bg-white
            p-6
          "
        >
          <div className="h-5 w-20 rounded bg-slate-200" />

          <div className="mt-4 h-6 w-2/3 rounded bg-slate-200" />

          <div className="mt-4 h-4 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />

          <div className="mt-6 h-4 w-24 rounded bg-slate-200" />

          <div className="mt-6 h-10 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export default ProceduresSkeleton;