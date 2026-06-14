import ProcedureCard from "./ProcedureCard";

import type { Procedure } from "../../types/procedure.types";

interface ProceduresListProps {
  procedures: Procedure[];
}

function ProceduresList({
  procedures,
}: ProceduresListProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {procedures.map((procedure) => (
        <ProcedureCard
          key={procedure.id}
          procedure={procedure}
        />
      ))}
    </div>
  );
}

export default ProceduresList;