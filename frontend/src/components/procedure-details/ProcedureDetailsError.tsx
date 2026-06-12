interface ProcedureDetailsErrorProps {
  message?: string;
}

function ProcedureDetailsError({
  message = "Unable to load procedure details.",
}: ProcedureDetailsErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-red-200
          bg-white
          p-8
          text-center
          shadow-sm
        "
      >
        <div className="mb-4 text-5xl">
          ⚠️
        </div>

        <h2 className="text-2xl font-bold text-slate-900">
          Something went wrong
        </h2>

        <p className="mt-3 text-slate-600">
          {message}
        </p>
      </div>
    </div>
  );
}

export default ProcedureDetailsError;