//src/modules/attendance/features/admin_correct_point/domain/admin_correct_point.schema.ts
import { z } from "zod";

export const AdminCorrectPointSchema = z.object({
  attendance_point_id: z.string().uuid(),
  new_mark_time: z.string().regex(/^\d{2}:\d{2}$/, "Formato HH:mm"),
  note: z.string().min(3, "La nota es obligatoria y debe ser significativa"),
});
export type AdminCorrectPointDTO = z.infer<typeof AdminCorrectPointSchema>;