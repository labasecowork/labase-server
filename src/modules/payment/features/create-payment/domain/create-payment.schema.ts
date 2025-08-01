// src/modules/payment/features/create-payment/domain/create-payment.schema.ts
import { z } from "zod";

/* 🔹 Sub-schema reutilizable para la ubicación (dataMap) */
export const locationDataMap = z.object({
  urlAddress: z.string().url(),
  serviceLocationCityName: z.string().max(50),
  serviceLocationCountrySubdivisionCode: z.string().length(3), // ej. "LIM"
  serviceLocationCountryCode: z.string().length(3),            // ej. "PER"
  serviceLocationPostalCode: z.string().max(10),
});

/* 🔹 Schema principal ampliado */
export const CreatePaymentSchema = z.object({
  reservationId: z.string().uuid(),
  purchaseNumber: z
    .string()
    .regex(/^\d{1,12}$/, "purchaseNumber must be 1-12 digits"),
  amount:   z.number().positive(),
  currency: z.enum(["PEN", "USD"]),
   metadata: z
    .object({
      antifraud: z
        .object({
          clientIp:           z.string().optional(),
          merchantDefineData: z.record(z.any()).optional(),
        })
        .optional(),
      dataMap: locationDataMap.optional(),   // ← aquí
    })
    .optional(),
});

export type CreatePaymentDTO = z.infer<typeof CreatePaymentSchema>;
