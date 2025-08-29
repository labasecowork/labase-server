// src/modules/chatbot/presentation/service/lead_funnel.service.ts
import { classifyIntent, generateReply } from "../../data/api/gemini.provider";
import { chatbotConfig } from "../../data/config/chatbot.config";

const TZ = chatbotConfig.openHours?.timezone ?? "America/Lima";

function fmtDateLima(d: Date) {
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: TZ,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}
function fmtTimeLima(d: Date) {
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}
function todayLimaISO() {
  const d = new Date();
  const [y, m, dd] = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(d)
    .filter((p) => p.type !== "literal")
    .map((p) => p.value);
  return `${y}-${m}-${dd}`;
}
function addDaysLima(baseISO: string, days: number) {
  const [y, m, d] = baseISO.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  const y2 = dt.getUTCFullYear();
  const m2 = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const d2 = String(dt.getUTCDate()).padStart(2, "0");
  return `${y2}-${m2}-${d2}`;
}

function isValidTimeHHmm(s: string) {
  const m = s.match(/^(\d{2}):(\d{2})$/);
  if (!m) return false;
  const hh = Number(m[1]),
    mm = Number(m[2]);
  return hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59;
}
function toMinutes(s: string) {
  const [hh, mm] = s.split(":").map(Number);
  return hh * 60 + mm;
}
function isWithinOpenHours(timeHHmm: string) {
  const start = chatbotConfig.openHours?.start ?? "09:00";
  const end = chatbotConfig.openHours?.end ?? "19:30";
  const t = toMinutes(timeHHmm);
  return t >= toMinutes(start) && t <= toMinutes(end);
}
function isDateNotPastLima(yyyy_mm_dd: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(yyyy_mm_dd)) return false;
  const today = todayLimaISO();
  return yyyy_mm_dd >= today;
}

/** Normalizador de espacios */
function normalizeSpaceName(input: string): string | null {
  const t = input.normalize("NFKC").trim().toLowerCase();
  const aliases = chatbotConfig.spaceAliases ?? {};
  for (const canonical of Object.keys(aliases)) {
    const list = aliases[canonical];
    if (list.some((a) => t.includes(a))) return canonical;
  }
  const canonMatch = Object.keys(aliases).find((k) => t.includes(k));
  return canonMatch ?? null;
}

/** Relative dates: hoy/mañana/ayer */
function resolveRelativeDate(text: string): string | null {
  const t = text.toLowerCase();
  const today = todayLimaISO();
  if (/\b(hoy)\b/.test(t)) return today;
  if (/\b(mañana|manana)\b/.test(t)) return addDaysLima(today, 1);
  if (/\b(ayer)\b/.test(t)) return addDaysLima(today, -1);
  return null;
}

type Step = "idle" | "phone" | "space" | "date" | "time" | "review" | "done";
export type Lead = {
  phone?: string;
  space_name?: string;
  date?: string; // yyyy-mm-dd
  time?: string; // hh:mm
  full_name?: string;
  dni?: string;
  people?: number;
  purpose?: string;
  email?: string;
};

type Session = { step: Step; data: Lead; updatedAt: number };
const SESSIONS = new Map<string, Session>();
const TTL_MS = 1000 * 60 * 30; // 30 min

function getSession(chatId: string): Session {
  const now = Date.now();
  const s = SESSIONS.get(chatId);
  if (s && now - s.updatedAt < TTL_MS) return s;
  const fresh: Session = { step: "idle", data: {}, updatedAt: now };
  SESSIONS.set(chatId, fresh);
  return fresh;
}
function save(chatId: string, s: Session) {
  s.updatedAt = Date.now();
  SESSIONS.set(chatId, s);
}
/** Exporta el step para el bot (bloqueo de saludos) */
export function getCurrentStepFor(chatId: string): Step {
  return getSession(chatId).step;
}

/** Mensaje bonito para admins */
function prettyLead(l: Lead) {
  const now = new Date();
  const fechaHuman = l.date ? l.date.split("-").reverse().join("/") : "-";
  const hdr = "🔔 Nueva Solicitud - La Base";
  const body = [
    l.full_name ? `👤 Cliente: ${l.full_name}` : null,
    l.phone ? `📞 Teléfono: +${l.phone}` : null,
    l.email ? `📧 Email: ${l.email}` : null,
    l.date ? `📅 Fecha: ${fechaHuman}` : null,
    l.time ? `🕐 Hora: ${l.time}` : null,
    l.space_name ? `🏢 Espacio: ${l.space_name}` : null,
    l.people ? `👥 Personas: ${l.people}` : null,
    l.purpose ? `📝 Motivo: ${l.purpose}` : null,
  ]
    .filter(Boolean)
    .join("\n");
  const rec = `⏰ Recibida: ${fmtDateLima(now)}, ${fmtTimeLima(now)}`;
  const code = `#RES${Math.floor(Math.random() * 1e9)
    .toString()
    .padStart(9, "0")}`;
  return [hdr, body, "", rec, "", code, "#WhatsApp #Roxi #Lead"].join("\n");
}

function isReserveKeyword(t: string) {
  return /\b(reservar|reserva|booking|apartado)\b/i.test(t);
}
function isCancel(t: string) {
  return /\b(cancel|cancelar|reiniciar|reset)\b/i.test(t);
}

export type Action =
  | { kind: "reply"; text: string }
  | { kind: "send_admin"; text: string; alsoReply?: string }
  | { kind: "handoff_number"; text: string };

export async function handleIncomingText(
  from: string,
  text: string,
): Promise<Action[]> {
  const s = getSession(from);
  const tRaw = text.trim();
  const t = tRaw.normalize("NFKC");

  if (isCancel(t)) {
    SESSIONS.delete(from);
    return [
      {
        kind: "reply",
        text: "Flujo reiniciado. Escribe “reservar” para empezar o pregúntame lo que necesites.",
      },
    ];
  }

  // Idle: clasificador o keyword
  if (s.step === "idle" && !isReserveKeyword(t)) {
    const intent = await classifyIntent({ userText: t });
    if (intent.intent === "reservation_start") {
      s.step = "phone";
      save(from, s);
      return [
        {
          kind: "reply",
          text: "Perfecto, iniciemos tu solicitud. ¿Cuál es tu número de celular? (solo dígitos, por favor)",
        },
      ];
    }
    const reply = await generateReply({ userText: t });
    return [{ kind: "reply", text: reply }];
  }

  if (s.step === "idle" && isReserveKeyword(t)) {
    s.step = "phone";
    save(from, s);
    return [
      {
        kind: "reply",
        text: "Genial. Para contactarte: ¿tu número de celular? (9 dígitos)",
      },
    ];
  }

  // phone
  if (s.step === "phone") {
    const digits = t.replace(/\D+/g, "");
    if (!/^9\d{8}$/.test(digits)) {
      return [
        {
          kind: "reply",
          text: "Formato no válido. Debe empezar en 9 y tener 9 dígitos. Intenta nuevamente.",
        },
      ];
    }
    s.data.phone = digits;
    s.step = "space";
    save(from, s);
    return [
      {
        kind: "reply",
        text: "¿Qué espacio te interesa? (Unidad, Bunker, Brigada, Base de Mando, Base Operativa, El Hangar)",
      },
    ];
  }

  // space
  if (s.step === "space") {
    // Orientar si pregunta por 1 persona
    if (/\b(una persona|1 persona|solo|individual)\b/i.test(t)) {
      const hint =
        chatbotConfig.spaceHints?.onePerson ??
        "Para 1 persona: Unidad (privado 1p). Como individual en compartido: Base Operativa o El Hangar.";
      return [{ kind: "reply", text: `${hint}\n\n¿Cuál prefieres?` }];
    }
    const canon = normalizeSpaceName(t);
    if (!canon) {
      return [
        {
          kind: "reply",
          text: "No identifiqué el espacio. Opciones: Unidad (1p), Bunker (2–4), Brigada (2–4), Base de Mando (2–10), Base Operativa/El Hangar (individual en compartido). ¿Cuál prefieres?",
        },
      ];
    }
    s.data.space_name = canon;
    s.step = "date";
    save(from, s);
    return [
      {
        kind: "reply",
        text: "¿Para qué fecha? (formato yyyy-mm-dd, ej. 2025-09-03). También puedo entender “hoy”, “mañana”.",
      },
    ];
  }

  // date
  if (s.step === "date") {
    const rel = resolveRelativeDate(t);
    const value = rel ?? t;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return [
        {
          kind: "reply",
          text: "Formato inválido. Usa yyyy-mm-dd (p. ej. 2025-09-03) o escribe “hoy/mañana”.",
        },
      ];
    }
    if (!isDateNotPastLima(value)) {
      return [
        {
          kind: "reply",
          text: `Esa fecha ya pasó. Elige una a partir de hoy (${todayLimaISO()}).`,
        },
      ];
    }
    s.data.date = value;
    s.step = "time";
    save(from, s);
    const start = chatbotConfig.openHours?.start ?? "09:00";
    const end = chatbotConfig.openHours?.end ?? "19:30";
    return [
      {
        kind: "reply",
        text: `¿A qué hora? (HH:mm 24h, entre ${start} y ${end})`,
      },
    ];
  }

  // time
  if (s.step === "time") {
    if (!isValidTimeHHmm(t)) {
      const start = chatbotConfig.openHours?.start ?? "09:00";
      const end = chatbotConfig.openHours?.end ?? "19:30";
      return [
        {
          kind: "reply",
          text: `Formato inválido. Usa HH:mm 24h (ej. 15:30). Recuerda: atención ${start}–${end}.`,
        },
      ];
    }
    if (!isWithinOpenHours(t)) {
      const start = chatbotConfig.openHours?.start ?? "09:00";
      const end = chatbotConfig.openHours?.end ?? "19:30";
      return [
        {
          kind: "reply",
          text: `Estamos disponibles entre ${start} y ${end}. Elige una hora dentro de ese rango.`,
        },
      ];
    }

    s.data.time = t;
    s.step = "review";
    save(from, s);

    const msgAdmin = prettyLead(s.data);
    return [
      {
        kind: "send_admin",
        text: msgAdmin,
        alsoReply: `Listo, he enviado tu solicitud al equipo 👌. Te contactarán a la brevedad. Si prefieres, también puedes escribir o llamar directo al +${chatbotConfig.adminDirectNumber.replace(/@c\.us$/, "")}.`,
      },
    ];
  }

  if (s.step === "review") {
    s.step = "done";
    save(from, s);
    return [
      {
        kind: "handoff_number",
        text: `Si deseas atención inmediata, contáctanos al +${chatbotConfig.adminDirectNumber.replace(/@c\.us$/, "")}. ¿Necesitas algo más?`,
      },
    ];
  }

  return [
    {
      kind: "reply",
      text: "¿Te ayudo con información o deseas iniciar una reserva? Escribe “reservar” para empezar o “cancel” para reiniciar.",
    },
  ];
}
