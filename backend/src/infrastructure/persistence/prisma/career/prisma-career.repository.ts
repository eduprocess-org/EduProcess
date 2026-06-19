/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../database.config";
import { CareerRepository } from "../../../../domain/career/career.repository";
import { CareerDTO } from "../../../../domain/career/career.types";

export class PrismaCareerRepository implements CareerRepository {
  async findAll(): Promise<CareerDTO[]> {
    const careers = await prisma.career.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        faculty: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return careers.map((c: any) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      faculty: {
        id: c.faculty.id,
        name: c.faculty.name,
      },
    }));
  }
}
