import qrcode from "qrcode-terminal";
import type { Message as WaMessage, Chat as WaChat } from "whatsapp-web.js";
import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

let GROUP_CACHE = new Map<string, string>();
const MAX_MESSAGE_AGE_MS = 5 * 60_000;

type Handlers = {
  onReady?: () => void;
  onMessage?: (msg: WaMessage) => Promise<void> | void;
};

let client: InstanceType<typeof Client> | null = null;
const QUEUE = new Map<string, Promise<void>>();

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

  const onMessage = handlers?.onMessage;
  if (onMessage) {
    client.on("message", async (msg: WaMessage) => {
      // Cola por chat: garantiza orden y evita descartar mensajes rápidos
      const chatId = msg.from;
      const prev = QUEUE.get(chatId) ?? Promise.resolve();

      const task = prev
        .then(async () => {
          try {
            if ((msg as any).fromMe) return;
            const body = (msg.body ?? "").trim();
            if (!body) return;

            const now = Date.now();
            const msgEpochMs = (msg.timestamp ?? 0) * 1000;
            if (msgEpochMs && now - msgEpochMs > MAX_MESSAGE_AGE_MS) return;

            await onMessage(msg);
          } catch (err) {
            console.error("[WhatsApp] onMessage error:", err);
          }
        })
        .finally(() => {
          // limpiar cola cuando termina
          if (QUEUE.get(chatId) === task) QUEUE.delete(chatId);
        });

      QUEUE.set(chatId, task);
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
