import qrcode from "qrcode-terminal";
import path from "path";
import WWebJS from "whatsapp-web.js";
import type { Message } from "whatsapp-web.js";
import { chatbotConfig } from "../../data/config/chatbot.config";

export type OnMessageHandler = (msg: Message) => Promise<void>;

export class WhatsAppProvider {
  private client: WWebJS.Client;

  constructor() {
    const { Client, LocalAuth } = WWebJS;

    // ⬇️ Directorio PERSISTENTE para la sesión (ajústalo si usas Docker/PM2)
    const sessionDir =
      process.env.WA_SESSION_DIR || path.resolve(process.cwd(), ".wwebjs_auth"); // p. ej. "/var/www/labase-server/.wwebjs_auth"

    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: "labase-bot", // 👈 no lo cambies entre ejecuciones
        dataPath: sessionDir, // 👈 persistente + con permisos
      }),
      puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      },
    });
  }

  init(onMessage: OnMessageHandler) {
    this.client.on("qr", (qr: string) => qrcode.generate(qr, { small: true }));
    this.client.on("ready", () => console.log("✅ WhatsApp bot listo"));
    this.client.on("auth_failure", (m) =>
      console.error("[WA] auth_failure:", m)
    );
    this.client.on("disconnected", (r) =>
      console.warn("[WA] disconnected:", r)
    );
    this.client.on("message", (msg: Message) => onMessage(msg));
    this.client.initialize();
  }

  async reply(to: string, text: string) {
    return this.client.sendMessage(to, text);
  }

  async sendToAdminGroup(text: string) {
    const groupId = chatbotConfig.adminGroupId;
    if (!groupId) throw new Error("WP_ADMIN_GROUP_ID no configurado");
    return this.client.sendMessage(groupId, text);
  }
}
