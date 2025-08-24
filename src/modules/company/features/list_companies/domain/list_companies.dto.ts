// src/modules/company/features/list_companies/domain/list_companies.dto.ts

import { z } from "zod";
import { ListCompaniesSchema } from "./list_companies.schema";
import { CompanyEntity } from "../../../entities/company.entity";

export type ListCompaniesDTO = z.infer<typeof ListCompaniesSchema>;

export interface ListCompaniesResponseDTO {
  companies: CompanyEntity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
