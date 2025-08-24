// src/modules/company/features/create_company/data/create_company.repository.ts
import { prismaClient } from "../../../../../config/prisma_client";
import { CreateCompanyDTO } from "../domain/create_company.dto";
import { CompanyEntity } from "../../../entities/company.entity";

export class CreateCompanyRepository {
  async execute(data: CreateCompanyDTO): Promise<CompanyEntity> {
    const company = await prismaClient.company.create({
      data: {
        name: data.name,
        description: data.description || null,
      },
    });

    return {
      id: company.id,
      name: company.name,
      description: company.description,
      created_at: company.created_at,
      updated_at: company.updated_at,
    };
  }

  async checkIfNameExists(name: string): Promise<boolean> {
    const existingCompany = await prismaClient.company.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    return !!existingCompany;
  }
}
