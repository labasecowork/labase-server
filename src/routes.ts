import { Router } from "express";
import botRoutes from "./modules/bot/presentation/routes/bot.routes";

const router = Router();
const API_VERSION = "/api/v1";

router.use(`${API_VERSION}/chatbot`, botRoutes);

export default router;
