// src/modules/visitor/features/create_visitor/data/create_visitor.repository.ts
import prisma from "../../../../../config/prisma_client";

export class CreateVisitorRepository {
  findHostByEmployeeId(employee_id: string) {
    return prisma.employee_details.findUnique({ where: { employee_id } });
  }
  findSpaceById(space_id: string) {
    return prisma.space.findUnique({ where: { id: space_id } });
  }
  create(data: {
    dni?: string | null;
    ruc?: string | null;
    first_name: string;
    last_name: string;
    phone?: string | null;
    email?: string | null;
    company?: string | null;
    employee_id: string;
    space_id: string;
    entry_time: Date;
    exit_time?: Date | null;
  }) {
    return prisma.visitors.create({ data });
  }
}
