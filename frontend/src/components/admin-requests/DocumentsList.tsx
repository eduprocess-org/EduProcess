import { FileText, Eye, Download } from "lucide-react";
import { toast } from "sonner";

interface DocumentsListProps {
  documents: { id: string; fileName: string; fileUrl: string }[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
  if (documents.length === 0) return <p className="text-sm text-[#64748B]">No documents attached.</p>;

  const handleDownload = (name: string, url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast.info(`Downloading ${name}`);
  };

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div key={doc.id} className="group flex items-center justify-between rounded-xl bg-[#F1F5FB] px-3.5 py-2.5 border border-[#E2EAF4] transition-all hover:translate-x-0.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <FileText size={14} className="flex-shrink-0 text-[#1A52A8]" />
            <span className="truncate text-xs font-semibold text-[#0F172A]">{doc.fileName}</span>
          </div>
          <div className="ml-2 flex flex-shrink-0 items-center gap-0.5">
            <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="flex h-7 w-7 items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-white" title="Preview">
              <Eye size={13} />
            </a>
            <button onClick={() => handleDownload(doc.fileName, doc.fileUrl)} className="flex h-7 w-7 items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-white" title="Download">
              <Download size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}