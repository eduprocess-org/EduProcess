function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-56 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-4 w-72 animate-pulse rounded-lg bg-slate-100" />
      </div>

      {/* Summary skeleton */}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
              <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-100" />
            </div>
            <div className="mt-3 h-8 w-12 animate-pulse rounded bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Cards skeleton */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-48 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-28 animate-pulse rounded bg-slate-100" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-16 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-8 w-24 animate-pulse rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardLoading;
