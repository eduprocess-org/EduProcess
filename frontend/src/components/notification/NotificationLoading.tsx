export default function NotificationLoading() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="
            animate-pulse
            rounded-xl
            border
            border-slate-200
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
            p-4
          "
        >
          <div className="flex gap-4">

            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />

            <div className="flex-1 space-y-3">

              <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />

              <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />

              <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />

            </div>

          </div>
        </div>
      ))}
    </div>
  );
}