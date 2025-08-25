// src/modules/visitor/features/create_visitor/domain/create_visitor.schema.ts
import { z } from "zod";

const onlyDigits = (len: number) =>
  z
    .string()
    .trim()
    .regex(new RegExp(`^\\d{${len}}$`), `must be ${len} digits`);

export const CreateVisitorSchema = z
  .object({
    dni: onlyDigits(8).optional(),
    ruc: onlyDigits(11).optional(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    company: z.string().optional(),
    employee_id: z.string().uuid(),
    space_id: z.string().uuid(),
    entry_time: z.string().datetime(),
    exit_time: z.string().datetime().optional(),
  })
  .refine((v) => !(v.dni && v.ruc), {
    message: "dni and ruc are mutually exclusive",
    path: ["dni"],
  })
  .refine(
    (v) => {
      if (!v.exit_time) return true;
      return (
        new Date(v.exit_time).getTime() >= new Date(v.entry_time).getTime()
      );
    },
    {
      message: "exit_time must be >= entry_time",
      path: ["exit_time"],
    },
  );
