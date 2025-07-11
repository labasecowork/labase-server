// src/modules/space/features/create_space/domain/dtos/create_space.dto.ts
import { z } from "zod";
import { CreateSpaceSchema } from "./create_space.schema";

export type CreateSpaceDTO = z.infer<typeof CreateSpaceSchema>;

export interface CreateSpaceResponseDTO {
  message: string;
  space_id: number;
}
