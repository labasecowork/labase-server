//src/modules/email/domain/bulk_email.repository.ts
import { z } from "zod";

export const BulkEmailSchema = z.object({
  subject: z.string().min(5, "Subject must have at least 5 characters"),
  text: z.string().min(5, "Text must have at least 5 characters"),
  html: z.string().optional()
});

export type BulkEmailDTO = z.infer<typeof BulkEmailSchema>; 
