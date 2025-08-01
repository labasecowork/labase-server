// src/modules/payment/features/create-payment/domain/create-payment.dto.ts
import { z } from "zod";
import { CreatePaymentSchema } from "./create-payment.schema";

export type CreatePaymentDTO = z.infer<typeof CreatePaymentSchema>;
