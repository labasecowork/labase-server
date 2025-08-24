// src/modules/attendance/features/list_all_attendance/domain/list_all_attendance.dto.ts

import { z } from "zod";
import { ListAllAttendanceSchema } from "./list_all_attendance.schema";

export type ListAllAttendanceDTO = z.infer<typeof ListAllAttendanceSchema>;

export interface AttendanceListItem {
  id: string;
  employee_id: string;
  type: "entry" | "exit";
  date: string;
  check_time: string;
  employee: {
    employee_id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export interface ListAllAttendanceResponseDTO {
  attendances: AttendanceListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
