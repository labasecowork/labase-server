import { z } from "zod";

export const SendMessageSchema = z.object({
  // Número en formato WhatsApp, ej: "51999988888@c.us"
  to: z.string().min(8),
  text: z.string().min(1).max(1000),
});

export type SendMessageDTO = z.infer<typeof SendMessageSchema>;
