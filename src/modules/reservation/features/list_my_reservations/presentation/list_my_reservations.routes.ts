// src/modules/reservation/features/list_my_reservations/presentation/list_my_reservations.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { ListMyReservationsController } from "./list_my_reservations.controller";

const router = Router();
const controller = new ListMyReservationsController();

router.get("/", authenticateToken, asyncHandler(controller.handle.bind(controller)));

export { router as listMyReservationsRoutes };
