import { Router } from "express";
import { asyncHandler } from "../../../middlewares/async_handler";
import { SeedController } from "./seed.controller";

const router = Router();
const controller = new SeedController();

router.get("/", asyncHandler(controller.handle.bind(controller)));

export { router as seedRouter };
