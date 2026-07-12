interface ErrorProceduresProps {
  message?: string;
}

function ErrorProcedures({ message = "Unable to load procedures." }: ErrorProceduresProps) {
  return (
    <div className="rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-950/30 p-4">
      <p className="font-medium text-red-700 dark:text-red-400">{message}</p>
    </div>
  );
}

export default ErrorProcedures;