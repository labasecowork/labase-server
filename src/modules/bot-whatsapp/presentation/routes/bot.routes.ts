// src/modules/bot-whatsapp/presentation/routes/bot.routes.ts
import { Router } from "express";
import { authenticateToken } from "../../../../middlewares/authenticate_token";
import { startBot } from "../controllers/bot.controller.ts";

const router = Router();

/**
 * @openapi
 * /api/v1/bot-whatsapp/start:
 *   post:
 *     tags: [BotWhatsApp]
 *     summary: Iniciar cliente de WhatsApp y chatbot
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Bot iniciado
 */
router.post("/start", authenticateToken, startBot);

export default router;
