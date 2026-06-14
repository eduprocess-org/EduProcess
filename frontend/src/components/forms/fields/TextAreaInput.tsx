interface Props {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function TextAreaInput({
  label,
  value,
  onChange,
  error,
}: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 min-h-[120px]"
      />

      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}