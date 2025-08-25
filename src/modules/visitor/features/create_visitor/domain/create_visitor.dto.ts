// src/modules/visitor/features/create_visitor/domain/create_visitor.dto.ts
import { z } from "zod";
import { CreateVisitorSchema } from "./create_visitor.schema";

export type CreateVisitorDTO = z.infer<typeof CreateVisitorSchema>;
