// src/modules/space/features/list_spaces/domain/list_spaces.dto.ts
import { z } from "zod";
import { ListSpacesSchema } from "./list_spaces.schema";

export type ListSpacesDTO = z.infer<typeof ListSpacesSchema>;
