import { useState, useTransition } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Procedure {
  id: string;
  code: string;
  name: string;
  description: string;
  requirements: string[];
  status: "active" | "inactive" | "draft";
  createdAt: string;
  estimatedTime: string;
}
let mockProceduresDatabase: Procedure[] = [
  { id: "1", code: "PROC-001", name: "Academic Certificate", description: "Official certificate issued by the university.", requirements: ["Copy of ID", "Payment receipt"], status: "active", createdAt: "2026-06-01", estimatedTime: "3 days" },
  { id: "2", code: "PROC-006", name: "Course Withdrawal", description: "Withdraw from an enrolled course.", requirements: ["Justification letter", "Academic record"], status: "active", createdAt: "2026-01-15", estimatedTime: "5 days" },
  { id: "3", code: "PROC-007", name: "Degree Verification", description: "Verify awarded academic degree.", requirements: ["Graduation act", "ID Copy"], status: "draft", createdAt: "2026-05-05", estimatedTime: "2 days" },
  { id: "4", code: "PROC-002", name: "Enrollment Certificate", description: "Certificate proving current enrollment.", requirements: ["Enrollment form"], status: "active", createdAt: "2026-06-02", estimatedTime: "1 day" },
  { id: "5", code: "PROC-003", name: "Graduation Request", description: "Application for graduation process.", requirements: ["All credits approved", "English certification"], status: "draft", createdAt: "2026-05-20", estimatedTime: "15 days" },
];

export function useProceduresManagementUI() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  // Query para obtener los trámites filtrados
  const { data, isLoading } = useQuery({
    queryKey: ["adminProcedures", { search, statusFilter }],
    queryFn: async () => {
      let filtered = [...mockProceduresDatabase];
      
      if (statusFilter !== "all") {
        filtered = filtered.filter(p => p.status === statusFilter);
      }
      if (search.trim() !== "") {
        const query = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.code.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query)
        );
      }
      return filtered;
    }
  });

  // Mutación mockeada para simular el guardado exitoso en el Backend
  const createProcedureMutation = useMutation({
    mutationFn: async (newProc: Omit<Procedure, "id" | "code" | "createdAt">) => {
      return new Promise<Procedure>((resolve, reject) => {
        setTimeout(() => {
          // Simular un error aleatorio del API solo para validar el requerimiento de Error Handling
          if (newProc.name.toLowerCase() === "error") {
            return reject(new Error("Internal Server Error (500)"));
          }

          const nextCodeNumber = mockProceduresDatabase.length + 1;
          const created: Procedure = {
            id: crypto.randomUUID(),
            code: `PROC-00${nextCodeNumber}`,
            createdAt: new Date().toISOString().split("T")[0],
            ...newProc
          };
          
          mockProceduresDatabase = [created, ...mockProceduresDatabase];
          resolve(created);
        }, 1200); // Retraso de red artificial
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProcedures"] });
    }
  });

  return {
    procedures: data ?? [],
    totalCount: mockProceduresDatabase.length,
    isLoading,
    isActionLoading: createProcedureMutation.isPending,
    search,
    statusFilter,
    setPage,
    handleSearchChange: (val: string) => startTransition(() => { setSearch(val); setPage(1); }),
    handleStatusChange: (val: string) => { setStatusFilter(val); setPage(1); },
    createProcedure: createProcedureMutation.mutateAsync
  };
}