import { ProcedureRepository } from '../../domain/procedures/procedure.repository';
import { supabase } from '../../infrastructure/config/supabase.config';

export class ProcedureService {
    constructor(private readonly procedureRepository: ProcedureRepository) {}

    async getAllProcedures() {
        return this.procedureRepository.findAllActive();
    }

    async getProcedureDetails(id: string) {
        const procedure = await this.procedureRepository.findById(id);
        if (!procedure) {
            throw new Error('Procedure not found');
        }
        return procedure;
    }

    async createRequest(studentId: string, procedureId: string, files: Express.Multer.File[]) {
        // Validate procedure exists
        const procedure = await this.procedureRepository.findById(procedureId);
        if (!procedure) {
            throw new Error('Procedure not found');
        }

        const uploadedDocuments: Array<{ fileName: string; fileUrl: string }> = [];

        // Upload files to Supabase Storage
        for (const file of files) {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${studentId}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
            
            const { data, error } = await supabase.storage
                .from('documents')
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype,
                });

            if (error) {
                console.error('Supabase upload error:', error);
                throw new Error('Failed to upload document');
            }

            const { data: publicUrlData } = supabase.storage
                .from('documents')
                .getPublicUrl(fileName);

            uploadedDocuments.push({
                fileName: file.originalname,
                fileUrl: publicUrlData.publicUrl,
            });
        }

        // Create the request in the database
        return this.procedureRepository.createRequest({
            studentId,
            procedureTypeId: procedureId,
            documents: uploadedDocuments,
        });
    }

    async getStudentRequests(studentId: string) {
        return this.procedureRepository.findRequestsByStudent(studentId);
    }

    async getRequestTracking(requestId: string, studentId: string) {
        const request = await this.procedureRepository.findRequestTracking(requestId, studentId);
        if (!request) {
            throw new Error('Request not found or unauthorized');
        }
        return request;
    }
}
