import { ChatbotService } from "../../application/services/chatbot.service";

// Evita inicializar más de una vez (hot-reload, PM2 cluster, etc.)
let started = false;
let instance: ChatbotService | null = null;

export async function startWhatsAppBot(): Promise<void> {
  if (started) return;
  instance = new ChatbotService();
  instance.init(); // esto dispara la conexión (QR en consola la 1ra vez)
  started = true;
  console.log("✅ WhatsApp bot: init solicitado");
}

// (Opcional) para pruebas o shutdown controlado
export function isWhatsAppBotStarted() {
  return started;
}
