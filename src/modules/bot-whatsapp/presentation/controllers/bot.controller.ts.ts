// src/modules/bot-whatsapp/presentation/controllers/bot.controller.ts
import { Response } from "express";
import { HttpStatusCodes } from "../../../../constants/http_status_codes";
import { asyncHandler } from "../../../../middlewares/async_handler";
import { ChatbotService } from "../../application/services/chatbot.service";
import { buildHttpResponse } from "../../../../utils";

const singleton = new ChatbotService();

export const startBot = asyncHandler(async (req: any, res: Response) => {
  singleton.init();
  return res
    .status(HttpStatusCodes.OK.code) // ⬅ número, no objeto
    .json(
      buildHttpResponse(
        HttpStatusCodes.OK.code, // status
        "WhatsApp bot iniciado", // description
        req?.originalUrl ?? "/api/v1/bot-whatsapp/start" // path (opcional)
      )
    );
});
