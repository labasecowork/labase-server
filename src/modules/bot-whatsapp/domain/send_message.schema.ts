// src/modules/chatbot/domain/send_message.schema.ts
import { z } from "zod";

export const SendMessageSchema = z.object({
  to: z.string().min(8), // "51999988888@c.us"
  text: z.string().min(1).max(1000),
});
export type SendMessageDTO = z.infer<typeof SendMessageSchema>;
