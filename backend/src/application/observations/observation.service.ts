import { ObservationRepository } from '../../domain/observations/observation.repository';
import { CreateObservationInput, ObservationDTO } from '../../domain/observations/observation.types';
import { logger } from '../../infrastructure/config/logger.config';
import { SocketEvents } from '../../infrastructure/websocket';

export class ObservationService {
    constructor(
        private readonly observationRepository: ObservationRepository,
        private readonly socketEvents?: SocketEvents
    ) {}

    async createObservation(input: CreateObservationInput): Promise<ObservationDTO> {
        logger.info('Observation creation attempt', { requestId: input.requestId, adminId: input.adminId });

        if (!input.comment || input.comment.trim().length === 0) {
            throw new Error('Observation comment is required');
        }

        const observation = await this.observationRepository.create({
            ...input,
            comment: input.comment.trim(),
        });

        logger.info('Observation created successfully', { observationId: observation.id, requestId: input.requestId });

        if (this.socketEvents && observation.studentId) {
            this.socketEvents.notifyNewObservation({
                requestId: input.requestId,
                studentId: observation.studentId,
                observationId: observation.id,
                comment: observation.comment,
                adminName: observation.adminName ?? 'Administrador',
                createdAt: observation.createdAt?.toISOString() ?? new Date().toISOString(),
            });
        }

        return observation;
    }

    async getObservationsByRequest(requestId: string): Promise<ObservationDTO[]> {
        return this.observationRepository.findByRequest(requestId);
    }

    async getObservationById(id: string): Promise<ObservationDTO> {
        const observation = await this.observationRepository.findById(id);
        if (!observation) {
            throw new Error('Observation not found');
        }
        return observation;
    }

    async deleteObservation(id: string): Promise<void> {
        const observation = await this.observationRepository.findById(id);
        if (!observation) {
            throw new Error('Observation not found');
        }
        await this.observationRepository.delete(id);
    }
}
