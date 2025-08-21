// src/modules/space/features/list_spaces/list_activated_spaces/domain/list_activated_spaces.dto.ts
import { z } from "zod";
import { ListActivatedSpacesSchema } from "./list_activated_spaces.schema";

export type ListActivatedSpacesDTO = z.infer<typeof ListActivatedSpacesSchema>;
