export interface ProcedureDetails {
  id: string;
  name: string;
  category: string;
  description: string;
  estimatedProcessingTime: string;
  requirements: string[];
  requiredDocuments: string[];
  instructions: string[];
}