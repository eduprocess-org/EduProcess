import { CareerDTO } from "./career.types";

export interface CareerRepository {
  findAll(): Promise<CareerDTO[]>;
}
