export interface CareerDTO {
  id: string;
  name: string;
  description: string;
  faculty: {
    id: string;
    name: string;
  };
}
