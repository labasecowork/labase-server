// src/modules/attendance/index.ts
import { Router } from "express";

import { markAttendanceRoutes } from "./features/mark_attendance/presentation/mark_attendance.routes";
import { adminCorrectPointRoutes } from "./features/admin_correct_point/presentation/admin_correct_point.routes";
import { listMyAttendanceRoutes } from "./features/list_my_attendance/presentation/list_my_attendance.routes";
import { attendanceStatsRoutes } from "./features/attendance_stats/";
import { listAllAttendanceRoutes } from "./features/list_all_attendance/";
import { detectInconsistenciesRoutes } from "./features/detect_inconsistencies";

export const attendanceRouter = Router();

attendanceRouter.use("/", markAttendanceRoutes);
attendanceRouter.use("/admin/correct-point", adminCorrectPointRoutes);
attendanceRouter.use("/", listAllAttendanceRoutes);
attendanceRouter.use("/stats", attendanceStatsRoutes);
attendanceRouter.use("/me", listMyAttendanceRoutes);
attendanceRouter.use("/detect-inconsistencies", detectInconsistenciesRoutes);

export default attendanceRouter;

