// src/modules/chatbot/presentation/whatsapp.bot.ts
import { Message } from "whatsapp-web.js";
import { initWpClient } from "../data/repository/whatsapp.repository";
import { ChatbotApi } from "../data/api/chatbot.api";

const ai = new ChatbotApi();

async function onIncomingMessage(msg: Message) {
  // Ignorar grupos
  if (msg.from.includes("@g.us")) return;

  const text = (msg.body || "").trim();
  if (!text) return;

  // Saludo simple con nueva marca
  if (/^hola\b/i.test(text)) {
    await msg.reply(
      "¡Hola! Soy el asistente del Grupo Aguirre Abogados Perú. ¿En qué puedo ayudarte?",
    );
    return;
  }

  // TODO a la IA (usa el contexto de chatbotConfig)
  const reply = await ai.generateReply(text);
  await msg.reply(reply);
}

export async function startWhatsAppBot() {
  await initWpClient({
    onMessage: onIncomingMessage,
    onReady: () =>
      console.log("[WhatsApp] Auto-reply con IA activo (Grupo Aguirre)."),
  });
}
