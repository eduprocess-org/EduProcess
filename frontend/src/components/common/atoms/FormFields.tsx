// src/components/common/FormFields.tsx
import React from "react";

interface FieldProps {
  label: string;
  error?: string;
}

export const InputField = ({ label, error, ...props }: FieldProps & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
      {label}
    </label>
    <input
      {...props}
      className={`px-4 py-2.5 text-sm rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
        error 
          ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-red-500/20 dark:bg-red-950/20 dark:text-red-200" 
          : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-[#131B2E] dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-950/40"
      }`}
    />
    {error && <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
  </div>
);

export const TextareaField = ({ label, error, ...props }: FieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
      {label}
    </label>
    <textarea
      {...props}
      className={`px-4 py-2.5 text-sm rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
        error 
          ? "border-red-500 bg-red-50/30 text-red-900 focus:ring-red-500/20 dark:bg-red-950/20 dark:text-red-200" 
          : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-[#131B2E] dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-950/40"
      }`}
    />
    {error && <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
  </div>
);