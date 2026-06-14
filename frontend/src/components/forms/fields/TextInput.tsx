import { type InputHTMLAttributes } from "react";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function TextInput({ label, error, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        {...props}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0B2D63]"
      />

      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}