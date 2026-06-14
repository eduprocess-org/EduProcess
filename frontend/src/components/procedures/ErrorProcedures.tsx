interface ErrorProceduresProps {
  message?: string;
}

function ErrorProcedures({
  message = "Unable to load procedures.",
}: ErrorProceduresProps) {
  return (
    <div
      className="
        rounded-xl
        border
        border-red-200
        bg-red-50
        p-4
      "
    >
      <p className="font-medium text-red-700">
        {message}
      </p>
    </div>
  );
}

export default ErrorProcedures;