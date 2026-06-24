import { useState } from "react";
import { Eye, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import type { Procedure } from "../../../types/admin/procedures/procedures.types";
import ProcedureStatusBadge from "./ProcedureStatusBadge";
import ProcedureDeleteModal from "./ProcedureDeleteModal"; 
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  procedures: Procedure[];
  onRefreshList: () => void;
}

function ProceduresTable({ procedures, onRefreshList }: Props) {
  const navigate = useNavigate();
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTrigger = (procedure: Procedure) => {
    setSelectedProcedure(procedure);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProcedure) return;
    setIsDeleting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Procedure type successfully removed from administrative registry.");
      onRefreshList(); 
      setSelectedProcedure(null);
    } catch (error) {
      toast.error("An error occurred while attempting to remove the procedure.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/60 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b-2 border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
              <th className="px-5 py-3.5 text-left">
                <button className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">
                  Code
                  <ArrowUpDown size={12} className="opacity-70" />
                </button>
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                Procedure
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                Description
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                Status
              </th>

              <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                Created
              </th>

              <th className="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {procedures.map((procedure) => (
              <tr
                key={procedure.id}
                className="
                  group
                  transition-colors duration-100
                  hover:bg-indigo-50/40
                  dark:hover:bg-indigo-950/20
                "
              >
                {/* CODE — Barra de acento incrustada */}
                <td className="relative px-5 py-4">
                  <div className="absolute left-0 top-0 h-full w-0.5 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-r" />
                  <span className="inline-block rounded-md bg-indigo-50 px-2 py-0.5 font-mono text-xs font-semibold text-indigo-600 ring-1 ring-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:ring-indigo-800">
                    {procedure.code}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {procedure.name}
                  </span>
                </td>

                <td className="px-5 py-4 max-w-xs">
                  <p className="truncate text-slate-500 dark:text-slate-400">
                    {procedure.description}
                  </p>
                </td>

                <td className="px-5 py-4">
                  <ProcedureStatusBadge status={procedure.status} />
                </td>

                <td className="px-5 py-4 text-slate-400 dark:text-slate-500 text-xs tabular-nums">
                  {procedure.createdAt}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-1">
                    {/* ACCIÓN: VISUALIZAR */}
                    <button
                      className="
                        rounded-lg p-2
                        text-slate-400 hover:text-slate-600
                        hover:bg-slate-100
                        dark:text-slate-500 dark:hover:text-slate-200
                        dark:hover:bg-slate-800
                        transition-all duration-150
                      "
                      aria-label="View procedure"
                      title="View details"
                    >
                      <Eye size={16} />
                    </button>

                    {/* ACCIÓN: EDITAR */}
                    <button
                      onClick={() => navigate(`/admin/procedures/edit/${procedure.id}`)}
                      className="
                        rounded-lg p-2
                        text-slate-400 hover:text-blue-600
                        hover:bg-blue-50 dark:hover:bg-blue-950/30
                        dark:text-slate-500 dark:hover:text-blue-400
                        transition-all duration-150
                      "
                      title="Edit Procedure"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* ACCIÓN: ELIMINAR */}
                    <button
                      onClick={() => handleDeleteTrigger(procedure)}
                      className="
                        rounded-lg p-2
                        text-slate-400 hover:text-red-600
                        hover:bg-red-50 dark:hover:bg-red-950/30
                        dark:text-slate-500 dark:hover:text-red-400
                        transition-all duration-150
                      "
                      title="Delete Procedure"
                      data-testid={`delete-btn-${procedure.id}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL INTERACTIVO DE CONFIRMACIÓN */}
      <ProcedureDeleteModal
        isOpen={selectedProcedure !== null}
        procedureName={selectedProcedure?.name || ""}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setSelectedProcedure(null)}
      />
    </div>
  );
}

export default ProceduresTable;