
export interface ProcedureData {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  estimatedTime: string;
  status: "active" | "draft";
}

const mockProceduresDb: Record<string, ProcedureData> = {
  "1": {
    id: "1",
    name: "Syllabus Certification Protocol",
    description: "Validation workflow for internal university academic layout.",
    requirements: ["Approved digital academic record", "Identity card copy"],
    estimatedTime: "3 business days",
    status: "active",
  },
};

export const mockProcedureEditService = {
  getProcedureById: async (id: string): Promise<ProcedureData> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const procedure = mockProceduresDb[id];
        if (procedure) {
          resolve(procedure);
        } else {
          reject(new Error("Procedure not found in database."));
        }
      }, 800); 
    });
  },

  updateProcedure: async (id: string, data: Omit<ProcedureData, "id">): Promise<ProcedureData> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulación de error aleatorio (10%) para probar manejo de errores del API
        if (Math.random() < 0.1) {
          reject(new Error("Internal Server Error: Concurrency conflict detected."));
        } else {
          resolve({ id, ...data });
        }
      }, 1200);
    });
  },
};