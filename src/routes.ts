import { Router } from "express";
import botRoutes from "./modules/bot/presentation/routes/bot.routes";
import { authRouter } from "./modules/auth/auth.routes";

const router = Router();
const API_VERSION = "/api/v1";

router.use(`${API_VERSION}/chatbot`, botRoutes);
router.use(`${API_VERSION}/auth`, authRouter);

export default router;
