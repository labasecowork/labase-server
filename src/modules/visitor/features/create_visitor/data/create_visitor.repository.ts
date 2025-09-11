import prisma from "../../../../../config/prisma_client";

export class CreateVisitorRepository {
  findHostByUserId(user_id: string) {
    return prisma.users.findUnique({
      where: { id: user_id },
      include: { employee_details: { include: { company: true } } },
    });
  }

  findCompanyById(company_id: string) {
    return prisma.companies.findUnique({ where: { id: company_id } });
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
    host_user_id: string;
    company_id?: string | null;
    space_id: string;
    entry_time: Date;
    exit_time?: Date | null;
  }) {
    return prisma.visitors.create({ data });
  }
}
