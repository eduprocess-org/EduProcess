// src/components/admin-procedures/RequirementsInput.tsx
import { Plus, Trash2 } from "lucide-react";

interface RequirementsInputProps {
  requirements: string[];
  onChange: (reqs: string[]) => void;
  error?: string;
  disabled?: boolean; // 1. Agregamos la propiedad opcional a la interfaz
}

export default function RequirementsInput({ requirements, onChange, error, disabled = false }: RequirementsInputProps) {
  const addField = () => {
    if (!disabled) onChange([...requirements, ""]);
  };
  
  const updateField = (index: number, value: string) => {
    if (disabled) return;
    const updated = [...requirements];
    updated[index] = value;
    onChange(updated);
  };

  const removeField = (index: number) => {
    if (!disabled) onChange(requirements.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Procedure Requirements
        </label>
        <button
          type="button"
          onClick={addField}
          disabled={disabled} // 2. Deshabilitamos el botón de agregar
          className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus size={14} /> Add Requirement
        </button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={req}
              onChange={(e) => updateField(index, e.target.value)}
              disabled={disabled} // 3. Deshabilitamos cada input individual
              placeholder={`Requirement #${index + 1}`}
              className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2E] text-slate-900 dark:text-slate-200 focus:outline-none focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            />
            {requirements.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(index)}
                disabled={disabled} // 4. Deshabilitamos el botón de eliminar
                className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
      {error && <p className="text-xs font-medium text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}