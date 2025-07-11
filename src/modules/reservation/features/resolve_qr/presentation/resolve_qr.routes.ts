// src/modules/reservation/features/resolve_qr/presentation/resolve_qr.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { ResolveQrController } from "./resolve_qr.controller";

const router = Router();
const controller = new ResolveQrController();

router.post("/", asyncHandler(controller.handle.bind(controller)));

export { router as resolveQrRoutes };
