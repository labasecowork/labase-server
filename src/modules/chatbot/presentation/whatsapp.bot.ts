import { Message } from "whatsapp-web.js";
import { initWpClient } from "../data/repository/whatsapp.repository";
import { ChatbotApi } from "../data/api/chatbot.api";

const ai = new ChatbotApi();

async function onIncomingMessage(msg: Message) {
  // Ignorar grupos
  if (msg.from.includes("@g.us")) return;

  const text = (msg.body || "").trim();
  if (!text) return;

  if (text.toLowerCase() === "hola") {
    await msg.reply(
      "¡Hola! Soy el asistente de La Base. ¿En qué puedo ayudarte?",
    );
    return;
  }

  const reply = await ai.generateReply(text);
  await msg.reply(reply);
}

export async function startWhatsAppBot() {
  await initWpClient({
    onMessage: onIncomingMessage,
    onReady: () => console.log("[WhatsApp] Auto‑reply con IA activo."),
  });
}
