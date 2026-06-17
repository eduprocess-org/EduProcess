export interface ProcedureDetails {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedProcessingTime: string;
  requirements: string[];
  documents: string[];
  instructions: string[];
}