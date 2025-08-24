// src/modules/company/features/delete_company/domain/delete_company.dto.ts

import { z } from "zod";
import { DeleteCompanyParamsSchema } from "./delete_company.schema";

export type DeleteCompanyParamsDTO = z.infer<typeof DeleteCompanyParamsSchema>;

export interface DeleteCompanyResponseDTO {
  message: string;
}
