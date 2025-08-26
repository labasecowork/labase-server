// src/modules/chatbot/presentation/bot/whatsapp.bot.ts
import type { Message } from "whatsapp-web.js";
import {
  initWpClient,
  sendText,
  sendToGroupByNameSafe,
  getGroupIdByName,
  listAllGroups, // debug: listar grupos
} from "../../data/repository/whatsapp.repository";
import {
  handleIncomingText,
  getCurrentStepFor,
} from "../service/lead_funnel.service";
import { chatbotConfig } from "../../data/config/chatbot.config";
import {
  shouldGreet,
  makeIntro,
  markGreeted,
  isPureGreeting,
} from "../ui/greeting";

// Marca de tiempo del arranque (WA da timestamps en segundos)
const BOOT_EPOCH = Math.floor(Date.now() / 1000);

// Evita procesar dos veces el mismo mensaje
const SEEN = new Set<string>();
const MAX_SEEN = 2000;
function remember(id: string) {
  SEEN.add(id);
  if (SEEN.size > MAX_SEEN) {
    const [first] = SEEN.values();
    SEEN.delete(first);
  }
}

export async function startWhatsAppBot() {
  await initWpClient({
    onReady: async () => {
      console.log("[WhatsApp] Bot activo ✅");
      console.log(
        "[WhatsApp] Enviando leads a:",
        chatbotConfig.adminGroupId ?? chatbotConfig.adminGroupName,
      );

      // Debug: lista todos los grupos e imprime sus IDs si DEBUG_GROUPS=1
      if (process.env.DEBUG_GROUPS === "1") {
        await listAllGroups();
      }

      // Log del ID resuelto por nombre (útil la primera vez)
      if (!chatbotConfig.adminGroupId && chatbotConfig.adminGroupName) {
        const id = await getGroupIdByName(chatbotConfig.adminGroupName);
        console.log("[WhatsApp] Group ID por nombre:", id ?? "no encontrado");
      }
    },

    onMessage: async (msg: Message) => {
      try {
        if (msg.fromMe) return;

        // ignora mensajes previos al arranque (replay de históricos)
        if ((msg.timestamp ?? 0) < BOOT_EPOCH) return;

        // ignora grupos
        const chat = await msg.getChat();
        if ((chat as any).isGroup) return;

        // ignora duplicados exactos
        const key =
          (msg.id as any)?._serialized ?? `${msg.from}:${msg.timestamp}`;
        if (SEEN.has(key)) return;
        remember(key);

        const text = (msg.body || "").trim();
        if (!text) return;

        // No saludar si hay flujo activo
        const step = getCurrentStepFor(msg.from);
        const inFlow = step !== "idle" && step !== "done";

        if (!inFlow && shouldGreet(msg.from, text)) {
          await sendText(msg.from, makeIntro());
          markGreeted(msg.from);
          if (isPureGreeting(text)) return; // evita doble respuesta
        }

        // UX: “escribiendo…” mientras procesas
        await chat.sendStateTyping();

        // Funnel / Chat
        const actions = await handleIncomingText(msg.from, text);
        for (const a of actions) {
          if (a.kind === "reply" || a.kind === "handoff_number") {
            await sendText(msg.from, a.text);
          } else if (a.kind === "send_admin") {
            // Prioriza ID directo; fallback por nombre seguro
            const gid = chatbotConfig.adminGroupId;
            if (gid) {
              await sendText(gid, a.text);
            } else {
              await sendToGroupByNameSafe(chatbotConfig.adminGroupName, a.text);
            }
            console.log(
              "[WhatsApp] Lead enviado a grupo:",
              chatbotConfig.adminGroupId ?? chatbotConfig.adminGroupName,
            );

            if (a.alsoReply) await sendText(msg.from, a.alsoReply);
          }
        }
      } catch (e) {
        console.error("[Chatbot] Error en onMessage:", e);
        try {
          await sendText(
            msg.from,
            "Ocurrió un inconveniente. Intenta de nuevo, por favor.",
          );
        } catch {}
      }
    },
  });
}
