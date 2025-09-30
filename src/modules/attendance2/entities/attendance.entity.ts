// src/modules/attendance/entities/attendance.entity.ts

export interface AttendanceEntity {
  id: string;
  employee_id: string;
  type: "ENTRY" | "EXIT";
  date: Date;
  check_time: Date;
  employee?: {
    employee_id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export type AttendanceType = "ENTRY" | "EXIT";
