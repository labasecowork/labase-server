// src/modules/workarea/features/delete_workarea/domain/delete_workarea.dto.ts

import { z } from "zod";
import { DeleteWorkAreaParamsSchema } from "./delete_workarea.schema";

export type DeleteWorkAreaParamsDTO = z.infer<
  typeof DeleteWorkAreaParamsSchema
>;

export interface DeleteWorkAreaResponseDTO {
  message: string;
}
