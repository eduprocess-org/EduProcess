import { AlertTriangle } from "lucide-react";

interface Props {
  message: string;
}

function RequestTrackingError({ message }: Props) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <AlertTriangle size={26} />
        </div>

        <h2 className="text-lg font-semibold text-slate-900">
          Something went wrong
        </h2>

        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
}

export default RequestTrackingError;