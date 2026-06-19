import { CareerRepository } from "../../domain/career/career.repository";

export class CareerService {
  constructor(private readonly careerRepository: CareerRepository) {}

  async getAllCareers() {
    return this.careerRepository.findAll();
  }
}
