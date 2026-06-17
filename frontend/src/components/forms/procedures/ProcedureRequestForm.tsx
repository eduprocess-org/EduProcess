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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(procedureRequestSchema),
  });

  const handleFilesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(
      event.target.files || []
    );

    if (files.length + selectedFiles.length > 5) {
      setError("You can upload a maximum of 5 files.");
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      // Validar formato
      if (!allowedTypes.includes(file.type)) {
        setError(
          `${file.name} is not a valid file. Only PDF, JPG and PNG files are allowed.`
        );
        continue;
      }

      // Validar tamaño
      if (file.size > 5 * 1024 * 1024) {
        setError(
          `${file.name} exceeds the maximum size of 5 MB.`
        );
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      setError(null);
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: FormData) => {
    if (loading) return;

    if (files.length === 0) {
      setError("Please upload at least one supporting document.");
      return;
    }

    if (files.length > 5) {
      setError("You can upload a maximum of 5 files.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await createProcedureRequest({
        procedureId: procedure.id,
        data: {
          ...data,
          documents: files,
        },
      });

      setRequestId(response.requestId);
    } catch (err: any) {
      setError(err.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  if (requestId) {
    return (
      <RequestSuccess
        requestId={requestId}
        procedureName={procedure.name}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Procedure info */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm">
        <div className="h-[3px] w-full bg-[#0B2D63]" />
        <div className="p-5">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FA] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#0B2D63]">
            <Briefcase size={11} />
            Procedure
          </div>
          <h2 className="text-base font-semibold text-slate-900">
            {procedure.name}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            {procedure.description}
          </p>
        </div>
      </div>

      {/* Student info */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5">
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2FA] text-[#0B2D63]">
            <User size={15} />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">
            Student Information
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-0.5">
              Name
            </p>
            <p className="text-sm font-medium text-slate-800">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 mb-0.5">
              Email
            </p>
            <p className="text-sm font-medium text-slate-800 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 space-y-5">

        {/* Career */}
        <div>
          <label
            className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700"
          >
            <BookOpen size={14} className="text-[#0B2D63]" />
            Career
          </label>

          <input
          type="text"
          value={user?.career ?? "Not assigned"}
          disabled
          readOnly
          className="
            w-full rounded-lg border border-slate-200 bg-slate-100
            px-3 py-2.5 text-sm text-slate-800
            cursor-not-allowed
          "
          />
        </div>

        {/* Semester */}
        <div>
          <label 
          htmlFor="semester"
          className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <BookOpen size={14} className="text-[#0B2D63]" />
            Semester
          </label>
          <select
            id="semester"
            {...register("semester")}
            className="
              w-full rounded-lg border border-slate-200 bg-slate-50
              px-3 py-2.5 text-sm text-slate-800
              outline-none transition
              focus:border-[#0B2D63] focus:bg-white focus:ring-2 focus:ring-[#0B2D63]/10
            "
          >
            <option value="">Select semester</option>
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={String(index + 1)}>
                {index + 1}
              </option>
            ))}
          </select>
          {errors.semester?.message && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle size={12} />
              {errors.semester.message}
            </p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label 
          htmlFor="reason"
          className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <FileText size={14} className="text-[#0B2D63]" />
            Reason
          </label>
          <textarea
            id="reason"
            {...register("reason")}
            rows={4}
            className="
              w-full rounded-lg border border-slate-200 bg-slate-50
              px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400
              outline-none transition resize-none
              focus:border-[#0B2D63] focus:bg-white focus:ring-2 focus:ring-[#0B2D63]/10
            "
            placeholder="Describe the reason for your request..."
          />
          {errors.reason?.message && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
              <AlertCircle size={12} />
              {errors.reason.message}
            </p>
          )}
        </div>

        {/* Documents */}
        <div>
          <label
            className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700"
          >
            <Paperclip size={14} className="text-[#0B2D63]" />
            Supporting Documents
          </label>

          <div
            className="
              w-full rounded-lg border border-dashed border-slate-300 bg-slate-50
              px-4 py-4 text-center transition
              hover:border-[#0B2D63] hover:bg-[#EEF2FA]/40
            "
          >
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFilesChange}
              className="
                w-full cursor-pointer text-sm text-slate-500
                file:mr-3
                file:cursor-pointer
                file:rounded-lg
                file:border-0
                file:bg-[#0B2D63]
                file:px-3
                file:py-1.5
                file:text-xs
                file:font-medium
                file:text-white
              "
            />

            <p className="mt-2 text-xs text-slate-500">
              PDF, JPG or PNG accepted
            </p>

            <p className="text-xs text-amber-600 mt-1">
              Maximum size: 5 MB per file
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="
                    flex items-center justify-between
                    rounded-lg border border-slate-200
                    bg-white px-3 py-2
                  "
                >
                  <div>
                    <p className="text-sm font-medium">
                      {file.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="
                      text-red-500
                      hover:text-red-700
                    "
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
        <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => navigate(`/procedures/${procedure.id}`)}
          className="
            flex-1 rounded-xl border border-slate-200 bg-white
            px-4 py-2.5 text-sm font-medium text-slate-600
            transition hover:border-slate-300 hover:bg-slate-50
            active:scale-[0.98]
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
            flex-1 rounded-xl bg-[#0B2D63]
            px-4 py-2.5 text-sm font-medium text-white
            transition hover:bg-[#09224E]
            disabled:opacity-50 disabled:cursor-not-allowed
            active:scale-[0.98]
          "
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </form>
  );
}