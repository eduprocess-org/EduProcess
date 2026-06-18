import type { AdminRequest } from "../../services/admin/requests/requestManagement.service";
import RequestTableRow from "./RequestTableRow";

interface Props {
  requests: AdminRequest[];
  sortBy: string;
  order: "asc" | "desc";
  onSort: (field: string) => void;
  selectedRequests: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
}

const navy      = "#1B2B5E";
const borderClr = "#D9E3F0";
const textMuted = "#64748B";

const columns = [
  { label: "Request ID", field: "id"          },
  { label: "Student",    field: "studentName"  },
  { label: "Email",      field: "email"        },
  { label: "Procedure",  field: "procedureName"},
  { label: "Status",     field: "status"       },
  { label: "Submitted",  field: "submittedAt"  },
];

export default function RequestTable({
  requests,
  sortBy,
  order,
  onSort,
  selectedRequests,
  onToggleSelect,
  onToggleSelectAll,
}: Props) {
  if (!requests.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "#EFF6FF" }}
        >
          <svg
            className="h-7 w-7"
            style={{ color: "#93C5FD" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75a2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
            />
          </svg>
        </div>
        <p className="text-sm font-semibold" style={{ color: navy }}>
          No requests found
        </p>
        <p className="mt-1 text-xs" style={{ color: textMuted }}>
          Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr
            style={{
              backgroundColor: "#F8FAFC",
              borderBottom: `0.5px solid ${borderClr}`,
            }}
          >
            <th className="w-12 px-4 py-3">
              <input
                type="checkbox"
                checked={
                  requests.length > 0 &&
                  selectedRequests.length === requests.length
                }
                onChange={onToggleSelectAll}
              />
            </th>

            {columns.map((column) => (
              <th
                key={column.field}
                className="px-5 py-3 text-left text-xs uppercase tracking-wider"
                style={{ color: textMuted, fontWeight: 500 }}
              >
                <button
                  type="button"
                  onClick={() => onSort(column.field)}
                  className="flex items-center gap-1"
                  style={{ color: textMuted }}
                >
                  {column.label}
                  {sortBy === column.field && (
                    <span style={{ color: navy }}>
                      {order === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              </th>
            ))}

            {/* Actions column — no label */}
            <th className="w-20 px-5 py-3" />
          </tr>
        </thead>

        <tbody>
          {requests.map((request, index) => (
            <RequestTableRow
              key={request.id}
              request={request}
              isEven={index % 2 === 0}
              selected={selectedRequests.includes(request.id)}
              onSelect={() => onToggleSelect(request.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}