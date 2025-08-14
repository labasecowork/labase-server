// src/modules/chatbot/presentation/bot.routes.ts
import { Router } from "express";
// alias para no renombrar tu controller original
import { sendMessageController as sendChatbotMessageController } from "./send_message.controller";

export const chatbotwhatsapp = Router();

chatbotwhatsapp.post("/send", sendChatbotMessageController);
export default chatbotwhatsapp;
