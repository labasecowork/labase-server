//src/modules/attendance/features/mark_attendance/presentation/mark_attendance.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { MarkAttendanceController } from "./mark_attendance.controller";

const router = Router();
const controller = new MarkAttendanceController();

router.post("/", authenticateToken, asyncHandler(controller.handle.bind(controller)));

export { router as markAttendanceRoutes };