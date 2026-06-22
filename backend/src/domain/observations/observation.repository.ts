import { CreateObservationInput, ObservationDTO } from './observation.types';

export interface ObservationRepository {
    create(input: CreateObservationInput): Promise<ObservationDTO>;
    findByRequest(requestId: string): Promise<ObservationDTO[]>;
    findById(id: string): Promise<ObservationDTO | null>;
    delete(id: string): Promise<void>;
}
