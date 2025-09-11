import prisma from "../../../../../config/prisma_client";

export class EditVisitorRepository {
  findById(id: string) {
    return prisma.visitors.findUnique({
      where: { id },
      include: {
        host: {
          select: { id: true, first_name: true, last_name: true, email: true },
        },
        company: { select: { id: true, name: true } },
        space: { select: { id: true, name: true } },
      },
    });
  }

  findSpaceById(space_id: string) {
    return prisma.space.findUnique({ where: { id: space_id } });
  }

  findHostByUserId(user_id: string) {
    return prisma.users.findUnique({ where: { id: user_id } });
  }

  findCompanyById(company_id: string) {
    return prisma.companies.findUnique({ where: { id: company_id } });
  }

  update(
    id: string,
    data: Partial<{
      dni: string | null;
      ruc: string | null;
      first_name: string;
      last_name: string;
      phone: string | null;
      email: string | null;
      entry_time: Date;
      exit_time: Date;
      host_user_id: string;
      company_id: string | null;
      space_id: string;
    }>
  ) {
    const {
      dni,
      ruc,
      first_name,
      last_name,
      phone,
      email,
      entry_time,
      exit_time,
      host_user_id,
      company_id,
      space_id,
    } = data;

    return prisma.visitors.update({
      where: { id },
      data: {
        // scalars
        dni: dni === undefined ? undefined : dni,
        ruc: ruc === undefined ? undefined : ruc,
        first_name: first_name ?? undefined,
        last_name: last_name ?? undefined,
        phone: phone === undefined ? undefined : phone,
        email: email === undefined ? undefined : email,
        entry_time: entry_time ?? undefined,
        exit_time: exit_time ?? undefined,

        ...(host_user_id ? { host: { connect: { id: host_user_id } } } : {}),
        ...(space_id ? { space: { connect: { id: space_id } } } : {}),
        ...(company_id === undefined
          ? {}
          : company_id === null
          ? { company: { disconnect: true } }
          : { company: { connect: { id: company_id } } }),
      },
    });
  }
}
