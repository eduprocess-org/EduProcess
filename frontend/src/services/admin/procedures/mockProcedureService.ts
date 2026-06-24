export interface NewProcedureData {
  name: string;
  description: string;
  requirements: string[];
  estimatedTime: string;
  status: "active" | "draft";
}

let mockProceduresDB = [
  { id: "PROC-001", name: "Academic Certificate", description: "Official certificate issued by the university.", status: "active", createdAt: "2026-06-01" },
];

export const mockProcedureService = {
  create: async (data: NewProcedureData): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.1) {
          return reject(new Error("Database connection timeout. Code: 500"));
        }

        const newId = `PROC-00${mockProceduresDB.length + 1}`;
        const record = {
          id: newId,
          ...data,
          createdAt: new Date().toISOString().split('T')[0]
        };
        
        mockProceduresDB.push(record);
        resolve(record);
      }, 1200); 
    });
  }
};