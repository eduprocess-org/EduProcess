import { MessageSquare } from "lucide-react";

interface Props {
  comments?: string;
}

function AdministrativeComments({ comments }: Props) {
  if (!comments) return null;

  return (
    <div className="rounded-2xl border border-slate-100 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm dark:shadow-none p-6">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-gray-700">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2FA] dark:bg-blue-900/30 text-[#0B2D63] dark:text-blue-300">
          <MessageSquare size={15} />
        </div>
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Administrative Comments
        </h2>
      </div>
      <div className="rounded-xl border border-slate-100 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-4 py-3.5">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{comments}</p>
      </div>
    </div>
  );
}

export default AdministrativeComments;