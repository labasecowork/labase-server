// src/modules/reservation/features/check_availability/domain/dtos/check_availability.dto.ts
import { z } from "zod";
import { CheckAvailabilitySchema } from "./check_availability.schema";

export type CheckAvailabilityDTO = z.infer<typeof CheckAvailabilitySchema>;
