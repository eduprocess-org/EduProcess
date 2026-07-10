import { ListOrdered } from "lucide-react";

interface Props {
  instructions: string[];
}

function InstructionsSection({ instructions }: Props) {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-700 shadow-sm dark:shadow-none p-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-gray-700">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAEEDA] dark:bg-yellow-900/30 text-[#854F0B] dark:text-yellow-300">
          <ListOrdered size={16} />
        </div>
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Instructions
        </h2>
        <span className="ml-auto rounded-full border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          {instructions.length} steps
        </span>
      </div>

      {/* Steps */}
      <ol className="flex flex-col gap-2.5">
        {instructions.map((item, index) => (
          <li key={item} className="flex items-start gap-3 rounded-lg border border-slate-100 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="flex h-5 w-5 shrink-0 mt-0.5 items-center justify-center rounded-full bg-[#0B2D63] dark:bg-blue-700 text-[11px] font-semibold text-white">
              {index + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default InstructionsSection;