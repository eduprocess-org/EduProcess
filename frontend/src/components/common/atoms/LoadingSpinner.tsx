import { RefreshCw } from "lucide-react";

export function LoadingSpinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F1F5FB]">
      <div className="flex flex-col items-center gap-3">
        <RefreshCw size={20} className="animate-spin text-[#1A52A8]" />
        <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">{label}</p>
      </div>
    </div>
  );
}