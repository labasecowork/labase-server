// src/modules/workarea/features/create_workarea/domain/create_workarea.dto.ts

import { z } from "zod";
import { CreateWorkAreaSchema } from "./create_workarea.schema";

export type CreateWorkAreaDTO = z.infer<typeof CreateWorkAreaSchema>;

export interface CreateWorkAreaResponseDTO {
  message: string;
  workarea: {
    id: string;
    name: string;
    description: string | null;
    capacity: number;
    created_at: Date;
    updated_at: Date;
  };
}
