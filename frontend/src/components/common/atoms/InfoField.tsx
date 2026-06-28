import { type ReactNode } from "react";

interface InfoFieldProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function InfoField({ icon, label, value }: InfoFieldProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] dark:bg-blue-900/30">
        {icon}
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] dark:text-slate-500">
          {label}
        </p>
        <p className="text-sm font-semibold text-[#0F172A] dark:text-slate-200">{value}</p>
      </div>
    </div>
  );
}