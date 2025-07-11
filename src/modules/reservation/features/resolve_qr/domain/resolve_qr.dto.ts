// src/modules/reservation/features/resolve_qr/domain/resolve_qr.dto.ts
import { z } from "zod";

import { ResolveQrSchema } from "./resolve_qr.schema";
export type ResolveQrDTO = z.infer<typeof ResolveQrSchema>;
