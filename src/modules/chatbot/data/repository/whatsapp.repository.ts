import qrcode from "qrcode-terminal";

import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

import type { Message as WaMessage } from "whatsapp-web.js";

let client: InstanceType<typeof Client> | null = null;

export type WhatsAppHandlers = {
  onReady?: () => void;
  onMessage?: (msg: WaMessage) => Promise<void> | void;
};

export function getWpClient() {
  if (!client) throw new Error("WhatsApp client no inicializado");
  return client;
}

export async function initWpClient(handlers?: WhatsAppHandlers) {
  if (client) return client;

  client = new Client({
    authStrategy: new LocalAuth({ dataPath: ".wp-auth" }),
  });

  client.on("qr", (qr: string) => {
    console.log("[WhatsApp] Escanea el QR para iniciar sesión:");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("[WhatsApp] Listo");
    handlers?.onReady?.();
  });

  if (handlers?.onMessage) {
    client.on("message", handlers.onMessage);
  }

  await client.initialize();
  return client;
}
