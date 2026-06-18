function RequestTrackingSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">

      {/* Back link */}
      <div className="h-4 w-36 rounded bg-slate-200" />

      {/* Header card */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="h-[3px] bg-slate-200" />
        <div className="p-6 space-y-4">
          <div className="h-5 w-28 rounded-full bg-slate-200" />
          <div className="flex items-start justify-between gap-4">
            <div className="h-6 w-64 rounded-lg bg-slate-200" />
            <div className="h-6 w-24 rounded-full bg-slate-200" />
          </div>
          <div className="pt-4 border-t border-slate-100 grid gap-3 sm:grid-cols-2">
            <div className="h-16 rounded-xl bg-slate-100" />
            <div className="h-16 rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>

      {/* Timeline card */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="h-8 w-8 rounded-lg bg-slate-200" />
          <div className="h-4 w-24 rounded bg-slate-200" />
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="h-9 w-9 rounded-xl bg-slate-200" />
              {i < 2 && <div className="w-0.5 flex-1 min-h-[40px] rounded bg-slate-100" />}
            </div>
            <div className="flex flex-col gap-1.5 pb-6">
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="h-3 w-20 rounded bg-slate-100" />
              <div className="h-3 w-48 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Comments card */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="h-8 w-8 rounded-lg bg-slate-200" />
          <div className="h-4 w-40 rounded bg-slate-200" />
        </div>
        <div className="h-16 rounded-xl bg-slate-100" />
      </div>

    </div>
  );
}

export default RequestTrackingSkeleton;