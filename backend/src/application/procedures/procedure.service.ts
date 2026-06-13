import { ProcedureRepository } from '../../domain/procedures/procedure.repository';
import { supabase } from '../../infrastructure/config/supabase.config';
import { logger } from '../../infrastructure/config/logger.config';

export class ProcedureService {
    constructor(private readonly procedureRepository: ProcedureRepository) {}

    async getAllProcedures() {
        return this.procedureRepository.findAllActive();
    }

    async getProcedureDetails(id: string) {
        const procedure = await this.procedureRepository.findById(id);
        if (!procedure) {
            logger.warn('Procedure not found', { procedureId: id });
            throw new Error('Procedure not found');
        }
        return procedure;
    }

    async createRequest(studentId: string, procedureId: string, files: Express.Multer.File[]) {
        logger.info('Procedure request creation attempt', { studentId, procedureId, fileCount: files.length });

        if (!studentId) {
            logger.warn('Request creation rejected: missing studentId');
            throw new Error('Authenticated student required');
        }

        if (files.length === 0) {
            logger.warn('Request creation rejected: no documents provided', { studentId, procedureId });
            throw new Error('At least one document must be provided');
        }

        const procedure = await this.procedureRepository.findById(procedureId);

        if (!procedure) {
            logger.warn('Request creation rejected: procedure does not exist', { studentId, procedureId });
            throw new Error('Procedure not found');
        }

        if (!procedure.isActive) {
            logger.warn('Request creation rejected: procedure is inactive', { studentId, procedureId });
            throw new Error('Procedure is not available for new requests');
        }

        const uploadedDocuments: Array<{ fileName: string; fileUrl: string }> = [];

        for (const file of files) {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${studentId}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;

            const { error } = await supabase.storage
                .from('documents')
                .upload(fileName, file.buffer, {
                    contentType: file.mimetype,
                });

            if (error) {
                logger.error('Supabase storage upload failed', { studentId, procedureId, fileName, error: error.message });
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

        const request = await this.procedureRepository.createRequest({
            studentId,
            procedureTypeId: procedureId,
            documents: uploadedDocuments,
        });

        logger.info('Procedure request created successfully', { requestId: request.id, studentId, procedureId });

        return request;
    }

    async getStudentRequests(studentId: string) {
        return this.procedureRepository.findRequestsByStudent(studentId);
    }

    async getRequestTracking(requestId: string, studentId: string) {
        const request = await this.procedureRepository.findRequestTracking(requestId, studentId);
        if (!request) {
            logger.warn('Request tracking not found or unauthorized', { requestId, studentId });
            throw new Error('Request not found or unauthorized');
        }
        return request;
    }
}
