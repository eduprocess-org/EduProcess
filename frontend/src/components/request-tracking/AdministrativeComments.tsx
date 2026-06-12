import { MessageSquare } from "lucide-react";

interface Props {
  comments?: string;
}

function AdministrativeComments({ comments }: Props) {
  if (!comments) return null;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2FA] text-[#0B2D63]">
          <MessageSquare size={15} />
        </div>
        <h2 className="text-sm font-semibold text-slate-800">
          Administrative Comments
        </h2>
      </div>

      {/* Comment body */}
      <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5">
        <p className="text-sm leading-relaxed text-slate-700">{comments}</p>
      </div>
    </div>
  );
}

export default AdministrativeComments;