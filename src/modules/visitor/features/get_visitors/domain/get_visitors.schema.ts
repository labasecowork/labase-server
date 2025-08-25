// src/modules/visitor/features/get_visitors/domain/get_visitors.schema.ts
import { z } from "zod";

const toNumber = (v: unknown, def: number) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : def;
};

export const GetVisitorsQuerySchema = z
  .object({
    page: z
      .preprocess((v) => toNumber(v, 1), z.number().int().positive())
      .default(1),
    limit: z
      .preprocess((v) => {
        const n = toNumber(v, 10);
        return Math.min(n, 100);
      }, z.number().int().positive())
      .default(10),
    search: z
      .string()
      .transform((s) => s?.trim() || "")
      .optional(),
    employee_id: z.string().uuid().optional(),
    space_id: z.string().uuid().optional(),
    date_from: z.string().datetime().optional(),
    date_to: z.string().datetime().optional(),
  })
  .refine(
    (v) => {
      if (v.date_from && v.date_to) {
        return new Date(v.date_to).getTime() >= new Date(v.date_from).getTime();
      }
      return true;
    },
    { message: "date_to must be >= date_from", path: ["date_to"] },
  );

export const GetVisitorParamSchema = z.object({
  id: z.string().uuid(),
});
