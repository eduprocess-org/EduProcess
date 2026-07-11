import { Plus, Trash2 } from "lucide-react";

interface InstructionsInputProps {
  instructions: string[];
  onChange: (steps: string[]) => void;
  disabled?: boolean;
}

export default function InstructionsInput({ instructions, onChange, disabled = false }: InstructionsInputProps) {
  const addField = () => {
    if (!disabled) onChange([...instructions, ""]);
  };

  const updateField = (index: number, value: string) => {
    if (disabled) return;
    const updated = [...instructions];
    updated[index] = value;
    onChange(updated);
  };

  const removeField = (index: number) => {
    if (!disabled) onChange(instructions.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Procedure Instructions
        </label>
        <button
          type="button"
          onClick={addField}
          disabled={disabled}
          className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus size={14} /> Add Step
        </button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {instructions.map((step, index) => (
          <div key={index} className="flex gap-2 items-center">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
              {index + 1}
            </span>
            <input
              type="text"
              value={step}
              onChange={(e) => updateField(index, e.target.value)}
              disabled={disabled}
              placeholder={`Step #${index + 1}`}
              className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2E] text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            />
            {instructions.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(index)}
                disabled={disabled}
                className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
