import { CareerDTO, FacultyDTO } from "./career.types";

export interface CareerRepository {
  findAll(): Promise<CareerDTO[]>;
  findAllFaculties(): Promise<FacultyDTO[]>;
}
