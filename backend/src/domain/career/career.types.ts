export interface CareerDTO {
  id: string;
  name: string;
  description: string;
  faculty: {
    id: string;
    name: string;
  };
}

export interface FacultyDTO {
  id: string;
  name: string;
}
