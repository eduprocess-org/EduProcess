interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function SelectInput({
  label,
  options,
  value,
  onChange,
  error,
}: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
}