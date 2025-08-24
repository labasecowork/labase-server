// src/modules/company/features/list_companies/data/list_companies.repository.ts
import { prismaClient } from "../../../../../config/prisma_client";
import {
  ListCompaniesDTO,
  ListCompaniesResponseDTO,
} from "../domain/list_companies.dto";
import { CompanyEntity } from "../../../entities/company.entity";

export class ListCompaniesRepository {
  async execute(filters: ListCompaniesDTO): Promise<ListCompaniesResponseDTO> {
    const { page, limit, search } = filters;
    const skip = (page - 1) * limit;

    // Construir filtros dinámicos
    const where: any = {};

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    // Obtener total para paginación
    const total = await prismaClient.company.count({ where });

    // Obtener empresas con paginación
    const companies = await prismaClient.company.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });

    const companyEntities: CompanyEntity[] = companies.map((company) => ({
      id: company.id,
      name: company.name,
      description: company.description,
      created_at: company.created_at,
      updated_at: company.updated_at,
    }));

    return {
      companies: companyEntities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
