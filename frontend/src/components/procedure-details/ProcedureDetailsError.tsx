interface ProcedureDetailsErrorProps {
  message?: string;
}

function ProcedureDetailsError({ message = "Unable to load procedure details." }: ProcedureDetailsErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-red-200 dark:border-red-800/50 bg-white dark:bg-gray-900 p-8 text-center shadow-sm dark:shadow-none">
        <div className="mb-4 text-5xl">⚠️</div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Something went wrong
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          {message}
        </p>
      </div>
    </div>
  );
}

export default ProcedureDetailsError;