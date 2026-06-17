import { AlertTriangle } from "lucide-react";

interface Props {
  message: string;
}

function DashboardError({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
        <AlertTriangle size={22} />
      </div>

      <h2 className="mt-4 text-base font-semibold text-red-700">
        Something went wrong
      </h2>

      <p className="mt-1.5 max-w-xs text-sm text-red-500">
        {message}
      </p>
    </div>
  );
}

export default DashboardError;
