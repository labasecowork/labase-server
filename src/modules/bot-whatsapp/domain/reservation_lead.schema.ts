//src/modules/bot-whatsapp/domain/reservation_lead.schema.ts
import { z } from "zod";

export const ReservationLeadSchema = z.object({
  // paso 1: datos base
  name: z.string().min(2, "Nombre requerido"),
  phone: z
    .string()
    .regex(/^9\d{8}$/, "Celular peruano (9 dígitos, inicia con 9)"),
  // paso 2: espacio y capacidad
  space: z.enum([
    "unidad",
    "bunker",
    "brigada",
    "base de mando",
    "base operativa",
    "el hangar",
  ]),
  people: z.number().int().positive().max(20),
  // paso 3: fecha/hora (ISO o texto legible)
  date: z.string().min(3),
  start_time: z.string().min(3),
  end_time: z.string().min(3),
  // paso 4: extras
  purpose: z.string().min(3).max(200),
  notes: z.string().optional(),
  // metadatos
  channel: z.literal("whatsapp").default("whatsapp"),
  wa_from: z.string().min(3),
});
export type ReservationLead = z.infer<typeof ReservationLeadSchema>;
