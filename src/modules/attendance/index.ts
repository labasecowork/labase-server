// src/modules/attendance/index.ts
import { Router } from "express";

import { markAttendanceRoutes } from "./features/mark_attendance";
import { listAllAttendanceRoutes } from "./features/list_all_attendance";
import { listMyAttendanceRoutes } from "./features/list_my_attendance";
import { attendanceStatsRoutes } from "./features/attendance_stats";

export const attendanceRouter = Router();

attendanceRouter.use("/attendance", markAttendanceRoutes);
attendanceRouter.use("/attendance", listAllAttendanceRoutes);
attendanceRouter.use("/attendance/stats", attendanceStatsRoutes);
attendanceRouter.use("/me", listMyAttendanceRoutes);

/**
 * MATCHES:
 *  POST /api/v1/attendance                    → marcar asistencia (entrada/salida)
 *  GET  /api/v1/attendance                    → listar TODAS las asistencias (solo admin)
 *  GET  /api/v1/attendance/stats              → obtener estadísticas de asistencia (solo admin)
 *  GET  /api/v1/me/attendance                 → listar MIS asistencias (empleado)
 */
export default attendanceRouter;
