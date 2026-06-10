import {
  ArrowLeft,
  Clock3,
  FileText,
  CheckCircle,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import type { ProcedureDetails } from "../../types/procedure-details.types";

const mockProcedures: ProcedureDetails[] = [
  {
    id: "1",
    name: "Academic Transcript",
    category: "Academic",
    description:
      "Request your official academic transcript issued by the institution.",

    estimatedProcessingTime:
      "3 business days",

    requirements: [
      "Be an active student",
      "No outstanding financial obligations",
    ],

    requiredDocuments: [
      "National ID",
      "Enrollment Certificate",
    ],

    instructions: [
      "Complete the request form",
      "Upload required documents",
      "Submit the request",
    ],
  },

  {
    id: "2",
    name: "Enrollment Certificate",
    category: "Academic",
    description:
      "Generate proof of enrollment for academic and administrative purposes.",

    estimatedProcessingTime:
      "1 business day",

    requirements: [
      "Be currently enrolled",
    ],

    requiredDocuments: [
      "Student ID",
    ],

    instructions: [
      "Verify your personal information",
      "Submit the request",
    ],
  },
];

function ProcedureDetailsPage() {
  const { id } = useParams();

  const procedure =
    mockProcedures.find(
      (item) => item.id === id
    );

  if (!procedure) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">
          Procedure Not Found
        </h2>

        <p className="mt-2 text-slate-600">
          The selected procedure does not exist.
        </p>

        <Link
          to="/procedures"
          className="mt-6 inline-flex rounded-xl bg-[#0B2D63] px-5 py-3 text-white"
        >
          Back to Procedures
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        to="/procedures"
        className="inline-flex items-center gap-2 text-[#0B2D63] font-medium hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Procedures
      </Link>

      <div className="rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
              {procedure.category}
            </span>

            <h1 className="mt-4 text-3xl font-bold text-slate-900">
              {procedure.name}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <Clock3 size={18} />
            {procedure.estimatedProcessingTime}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Description
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            {procedure.description}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <CheckCircle size={20} />
            Requirements
          </h2>

          <ul className="mt-4 space-y-3">
            {procedure.requirements.map(
              (requirement) => (
                <li
                  key={requirement}
                  className="text-slate-600"
                >
                  • {requirement}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <FileText size={20} />
            Required Documents
          </h2>

          <ul className="mt-4 space-y-3">
            {procedure.requiredDocuments.map(
              (document) => (
                <li
                  key={document}
                  className="text-slate-600"
                >
                  • {document}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Instructions
        </h2>

        <ol className="mt-4 space-y-4">
          {procedure.instructions.map(
            (instruction, index) => (
              <li
                key={instruction}
                className="flex gap-4"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B2D63] text-sm font-semibold text-white">
                  {index + 1}
                </span>

                <span className="text-slate-600">
                  {instruction}
                </span>
              </li>
            )
          )}
        </ol>

        <button
          className="
            mt-8
            w-full
            rounded-xl
            bg-[#0B2D63]
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-[#09224E]
          "
        >
          Start Procedure
        </button>
      </div>
    </div>
  );
}

export default ProcedureDetailsPage;