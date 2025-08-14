import axios from "axios";
import { API_KEY_GEMINI } from "../../../../config/env";
import { chatbotConfig } from "../config/chatbot.config";

export class ChatbotApi {
  private readonly BASE =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

  async generateReply(userText: string): Promise<string> {
    const url = `${this.BASE}${API_KEY_GEMINI}`;
    const prompt = `${chatbotConfig.context}\n\nUsuario:\n${userText}\n\nAsistente:`;

    try {
      const { data } = await axios.post(url, {
        contents: [{ parts: [{ text: prompt }] }],
      });

      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "¿Podrías precisar un poco más tu consulta?"
      );
    } catch {
      return "Tuvimos un problema procesando tu mensaje. Intenta nuevamente en unos minutos.";
    }
  }
}
