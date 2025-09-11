import { z } from "zod";
import { ListMyAttendanceSchema } from "./list_my_attendance.schema";

export type ListMyAttendanceDTO = z.infer<typeof ListMyAttendanceSchema>;

export interface MyAttendanceItem {
  id: string;
  type: "entry" | "exit";
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
