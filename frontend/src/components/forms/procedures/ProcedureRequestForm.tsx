import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { User, Trash2, Briefcase, BookOpen, FileText, Paperclip, AlertCircle } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { procedureRequestSchema } from "../../../schemas/procedureRequest.schema";
import { createProcedureRequest } from "../../../services/student/procedures/procedureRequest.service";
import RequestSuccess from "./RequestSuccess";

interface Props {
  procedure: {
    id: string;
    name: string;
    description: string;
  };
}

interface FormData {
  semester: string;
  reason: string;
}

export default function ProcedureRequestForm({ procedure }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [files, setFiles]       = useState<File[]>([]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(procedureRequestSchema),
  });

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (files.length + selectedFiles.length > 5) {
      setError("You can upload a maximum of 5 files.");
      return;
    }

    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      if (!allowedTypes.includes(file.type)) {
        setError(`${file.name} is not a valid file. Only PDF, JPG and PNG files are allowed.`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} exceeds the maximum size of 5 MB.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) setError(null);
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    if (loading) return;
    if (files.length === 0) { setError("Please upload at least one supporting document."); return; }
    if (files.length > 5)   { setError("You can upload a maximum of 5 files."); return; }

    try {
      setLoading(true);
      setError(null);
      const response = await createProcedureRequest({
        procedureId: procedure.id,
        data: { ...data, documents: files },
      });
      setRequestId(response.requestId);
    } catch (err: any) {
      setError(err.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  if (requestId) {
    return <RequestSuccess requestId={requestId} procedureName={procedure.name} />;
  }

  // Shared field classes
  const inputBase = `
    w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition
    border-slate-200 dark:border-gray-600
    bg-slate-50 dark:bg-gray-800
    text-slate-800 dark:text-slate-200
    placeholder:text-slate-400 dark:placeholder:text-slate-500
    focus:border-[#0B2D63] dark:focus:border-blue-400
    focus:bg-white dark:focus:bg-gray-700
    focus:ring-2 focus:ring-[#0B2D63]/10 dark:focus:ring-blue-400/10
  `;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Procedure info */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-700 shadow-sm dark:shadow-none">
        <div className="h-[3px] w-full bg-[#0B2D63] dark:bg-blue-600" />
        <div className="p-5">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FA] dark:bg-blue-900/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0B2D63] dark:text-blue-300">
            <Briefcase size={11} />
            Procedure
          </div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {procedure.name}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {procedure.description}
          </p>
        </div>
      </div>

      {/* Student info */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-700 shadow-sm dark:shadow-none p-5">
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-gray-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2FA] dark:bg-blue-900/30 text-[#0B2D63] dark:text-blue-300">
            <User size={15} />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Student Information
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-100 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-3 py-2.5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-0.5">Name</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div className="rounded-lg border border-slate-100 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 px-3 py-2.5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-0.5">Email</p>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div className="rounded-2xl bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-700 shadow-sm dark:shadow-none p-5 space-y-5">

        {/* Career */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <BookOpen size={14} className="text-[#0B2D63] dark:text-blue-400" />
            Career
          </label>
          <input
            type="text"
            value={user?.career ?? "Not assigned"}
            disabled
            readOnly
            className="w-full rounded-lg border border-slate-200 dark:border-gray-600 bg-slate-100 dark:bg-gray-700 px-3 py-2.5 text-sm text-slate-800 dark:text-slate-300 cursor-not-allowed"
          />
        </div>

        {/* Semester */}
        <div>
          <label htmlFor="semester" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <BookOpen size={14} className="text-[#0B2D63] dark:text-blue-400" />
            Semester
          </label>
          <select id="semester" {...register("semester")} className={inputBase}>
            <option value="">Select semester</option>
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={String(index + 1)}>{index + 1}</option>
            ))}
          </select>
          {errors.semester?.message && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500 dark:text-red-400">
              <AlertCircle size={12} />
              {errors.semester.message}
            </p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="reason" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <FileText size={14} className="text-[#0B2D63] dark:text-blue-400" />
            Reason
          </label>
          <textarea
            id="reason"
            {...register("reason")}
            rows={4}
            className={`${inputBase} resize-none`}
            placeholder="Describe the reason for your request..."
          />
          {errors.reason?.message && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500 dark:text-red-400">
              <AlertCircle size={12} />
              {errors.reason.message}
            </p>
          )}
        </div>

        {/* Documents */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Paperclip size={14} className="text-[#0B2D63] dark:text-blue-400" />
            Supporting Documents
          </label>

          <div className="w-full rounded-lg border border-dashed border-slate-300 dark:border-gray-600 bg-slate-50 dark:bg-gray-800 px-4 py-4 text-center transition hover:border-[#0B2D63] dark:hover:border-blue-400 hover:bg-[#EEF2FA]/40 dark:hover:bg-blue-900/10">
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFilesChange}
              className="w-full cursor-pointer text-sm text-slate-500 dark:text-slate-400 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#0B2D63] dark:file:bg-blue-700 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white"
            />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">PDF, JPG or PNG accepted</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Maximum size: 5 MB per file</p>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{file.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => navigate(`/procedures/${procedure.id}`)}
          className="flex-1 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 transition hover:border-slate-300 dark:hover:border-gray-500 hover:bg-slate-50 dark:hover:bg-gray-700 active:scale-[0.98]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-xl bg-[#0B2D63] dark:bg-blue-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#09224E] dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </form>
  );
}