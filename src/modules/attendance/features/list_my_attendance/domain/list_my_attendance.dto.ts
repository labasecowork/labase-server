// src/modules/attendance/features/list_my_attendance/domain/list_my_attendance.dto.ts

import { z } from "zod";
import { ListMyAttendanceSchema } from "./list_my_attendance.schema";

export type ListMyAttendanceDTO = z.infer<typeof ListMyAttendanceSchema>;

export interface MyAttendanceItem {
  id: string;
  type: "ENTRY" | "EXIT";
  date: string;
  check_time: string;
}

export interface ListMyAttendanceResponseDTO {
  attendances: MyAttendanceItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
