// src/modules/chatbot/data/repository/whatsapp.repository.ts
import qrcode from "qrcode-terminal";
import type { Message as WaMessage, Chat as WaChat } from "whatsapp-web.js";
import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

// Cache de grupo + último manejado por chat (antispam simple)
let GROUP_CACHE = new Map<string, string>();
const LAST_HANDLED: Map<string, number> = new Map(); // chatId -> epoch ms
const MIN_REPLY_INTERVAL_MS = 10_000; // 10s entre respuestas al mismo chat
const MAX_MESSAGE_AGE_MS = 2 * 60_000; // 2 minutos

type Handlers = {
  onReady?: () => void;
  onMessage?: (msg: WaMessage) => Promise<void> | void;
};

let client: InstanceType<typeof Client> | null = null;

function ensureReady() {
  if (!client) throw new Error("WhatsApp client no inicializado");
}

export async function initWpClient(handlers?: Handlers) {
  if (client) return client;

  const dataPath = process.env.WP_AUTH_PATH ?? ".wp-auth";
  client = new Client({
    authStrategy: new LocalAuth({ dataPath }),
    puppeteer: {
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
      ],
    },
  });

  client.on("qr", (qr: string) => {
    console.log("[WhatsApp] Escanea el QR para iniciar sesión:");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("[WhatsApp] Cliente listo");
    handlers?.onReady?.();
  });

  client.on("auth_failure", (msg) => {
    console.error("[WhatsApp] Fallo de autenticación:", msg);
  });

  client.on("disconnected", (reason) => {
    console.warn("[WhatsApp] Desconectado:", reason);
  });

  // 👉 clave: guarda la referencia local para que deje de ser opcional
  const onMessage = handlers?.onMessage;
  if (onMessage) {
    client.on("message", async (msg: WaMessage) => {
      try {
        // 1) Ignora mensajes propios / vacíos
        if ((msg as any).fromMe) return;
        const body = (msg.body ?? "").trim();
        if (!body) return;

        // 2) Ignora muy antiguos
        const now = Date.now();
        const msgEpochMs = (msg.timestamp ?? 0) * 1000;
        if (msgEpochMs && now - msgEpochMs > MAX_MESSAGE_AGE_MS) return;

        // 3) Antispam por chat
        const chatId = msg.from;
        const last = LAST_HANDLED.get(chatId) ?? 0;
        if (now - last < MIN_REPLY_INTERVAL_MS) return;

        // 4) Marca como manejado antes de procesar
        LAST_HANDLED.set(chatId, now);

        // 5) Llama al handler real (ya no es opcional)
        await onMessage(msg);
      } catch (err) {
        console.error("[WhatsApp] onMessage error:", err);
      }
    });
  }

  await client.initialize();
  return client;
}

export function getWpClient() {
  ensureReady();
  return client!;
}

export async function sendText(to: string, text: string) {
  ensureReady();
  await client!.sendMessage(to, text);
}

function norm(s: string) {
  return s.normalize("NFKC").trim().toLowerCase();
}

export async function getGroupIdByName(name: string) {
  ensureReady();
  const key = norm(name);
  const cached = GROUP_CACHE.get(key);
  if (cached) return cached;

  const chats = await client!.getChats();
  const group = (chats as WaChat[]).find(
    (c: any) => (c as any).isGroup && norm((c as any).name) === key,
  );
  const id = (group as any)?.id?._serialized as string | undefined;
  if (id) GROUP_CACHE.set(key, id);
  return id;
}

export async function sendToGroupByName(name: string, text: string) {
  const gid = await getGroupIdByName(name);
  if (!gid) throw new Error(`Grupo no encontrado: ${name}`);
  await sendText(gid, text);
}

export async function sendToGroupByNameSafe(name: string, text: string) {
  try {
    await sendToGroupByName(name, text);
  } catch (e) {
    // invalida cache y reintenta una vez
    GROUP_CACHE.delete(norm(name));
    const gid = await getGroupIdByName(name);
    if (!gid) throw e;
    await sendText(gid, text);
  }
}
export async function listAllGroups() {
  ensureReady();
  const chats = await client!.getChats();
  const groups = chats.filter((c: any) => c.isGroup);
  for (const g of groups) {
    console.log(`[Grupo] "${g.name}" → ${g.id?._serialized}`);
  }
}
