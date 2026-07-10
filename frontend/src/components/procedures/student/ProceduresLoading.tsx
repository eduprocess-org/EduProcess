function ProceduresLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-64 animate-pulse rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900"
        />
      ))}
    </div>
  );
}

export default ProceduresLoading;