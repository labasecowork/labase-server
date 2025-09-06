//src/modules/bot-whatsapp/infrastructure/providers/gemini.provider.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { chatbotConfig } from "../../data/config/chatbot.config";

export class GeminiProvider {
  private model;
  constructor(
    apiKey = process.env.API_KEY_GEMINI!,
    modelName = "gemini-1.5-flash"
  ) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: modelName });
  }

  async chat(userText: string): Promise<string> {
    const prompt = [
      chatbotConfig.context,
      "Instrucción: contesta de forma breve y útil; si el usuario menciona 'reservar', sugiere iniciar el flujo guiado.",
      `Usuario: ${userText}`,
    ].join("\n\n");
    const res = await this.model.generateContent(prompt);
    return res.response.text().trim();
  }
}
