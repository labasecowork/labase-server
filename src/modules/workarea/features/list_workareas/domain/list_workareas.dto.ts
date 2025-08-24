// src/modules/workarea/features/list_workareas/domain/list_workareas.dto.ts

import { z } from "zod";
import { ListWorkAreasSchema } from "./list_workareas.schema";
import { WorkAreaEntity } from "../../../entities/workarea.entity";

export type ListWorkAreasDTO = z.infer<typeof ListWorkAreasSchema>;

export interface ListWorkAreasResponseDTO {
  workareas: WorkAreaEntity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
