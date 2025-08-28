// src/modules/chatbot/presentation/routes/send_message.routes.ts
import { Router } from "express";
import { sendMessageController } from "../controllers/send_message.controller";

export const chatbotwhatsapp = Router();
chatbotwhatsapp.post("/send", sendMessageController);
export default chatbotwhatsapp;
