import type { Message } from "whatsapp-web.js";
import { GeminiProvider } from "../../infrastructure/providers/gemini.provider";
import { WhatsAppProvider } from "../../infrastructure/providers/whatsapp.provider";
import { ReservationFunnel } from "../funnels/reservation.funnel";
import { chatbotConfig } from "../../data/config/chatbot.config";

export class ChatbotService {
  private gemini = new GeminiProvider();
  private funnel = new ReservationFunnel();

  constructor(private readonly wa = new WhatsAppProvider()) {}

  init() {
    this.wa.init(async (msg) => this.onIncoming(msg));
  }

  private async onIncoming(msg: Message) {
    const chatId = msg.from;
    const text = (msg.body || "").trim();

    if (/^(cancel|salir)$/i.test(text)) {
      if (this.funnel.isActive(chatId)) {
        await this.wa.reply(chatId, this.funnel.cancel(chatId));
        return;
      }
    }

    if (/^reserv(ar|a)$/i.test(text)) {
      const intro = this.funnel.start(chatId);
      await this.wa.reply(
        chatId,
        [
          "🧾 Para reservar, haré *preguntas concretas* para enviar tu solicitud al *equipo*.",
          intro,
        ].join("\n")
      );
      return;
    }

    if (this.funnel.isActive(chatId)) {
      const step = this.funnel.nextQuestion(chatId, text);
      await this.wa.reply(chatId, step.message);

      if (step.done && step.payload) {
        try {
          await this.wa.sendToAdminGroup(step.message);
          await this.wa.reply(
            chatId,
            "📨 ¡Listo! Tu solicitud fue enviada al *equipo* de La Base. Te contactaremos pronto."
          );
        } catch {
          await this.wa.reply(
            chatId,
            "⚠ Hubo un problema enviando al grupo. Intentaremos notificar al administrador directamente."
          );
        }
      }
      return;
    }

    let answer = "";
    try {
      answer = await this.gemini.chat(text);
    } catch {
      answer =
        "Estoy teniendo dificultades para responder ahora mismo. ¿Puedes repetir o intentar más tarde?";
    }
    const suffix = `\n\nSi deseas *reservar*, escribe *reservar*. Más info: ${chatbotConfig.websiteUrl}`;
    await this.wa.reply(chatId, answer + suffix);
  }
}
