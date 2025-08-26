import { classifyIntent, generateReply } from "../../data/api/gemini.provider";
import { chatbotConfig } from "../../data/config/chatbot.config";
import {
  fmtDateLima,
  fmtTimeLima,
  todayLimaISO,
  addDaysLima,
} from "./datetime_lima.util";
import {
  isValidTimeHHmm,
  isWithinOpenHours,
  isDateNotPastLima,
  parseDateFlexible,
  parseTimeFlexible,
} from "./validators.util";
import { promptFor, softSkipResponse, helpFor } from "./messages.util";
import {
  isReserveKeyword,
  isCancel,
  isHelp,
  backRequested,
  wantsSkipAI,
  isFarewell,
  isWebsiteQuery,
} from "./controls.util";

const TZ = chatbotConfig.openHours?.timezone ?? "America/Lima";
const OPEN_START = chatbotConfig.openHours?.start ?? "09:00";
const OPEN_END = chatbotConfig.openHours?.end ?? "19:30";

const MAX_RETRIES = 3;

export type Step =
  | "idle"
  | "phone"
  | "space"
  | "date"
  | "time"
  | "review"
  | "done";
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

type Session = {
  step: Step;
  data: Lead;
  updatedAt: number;
  retries: Record<Step, number>;
  lastPrompt?: string;
};
const SESSIONS = new Map<string, Session>();
const TTL_MS = 1000 * 60 * 30;

/* ---- Sesión ---- */
function freshSession(): Session {
  return {
    step: "idle",
    data: {},
    updatedAt: Date.now(),
    retries: {
      idle: 0,
      phone: 0,
      space: 0,
      date: 0,
      time: 0,
      review: 0,
      done: 0,
    },
  };
}
function getSession(chatId: string): Session {
  const now = Date.now();
  const s = SESSIONS.get(chatId);
  if (s && now - s.updatedAt < TTL_MS) return s;
  const fresh = freshSession();
  SESSIONS.set(chatId, fresh);
  return fresh;
}
function save(chatId: string, s: Session, lastPrompt?: string) {
  s.updatedAt = Date.now();
  if (lastPrompt) s.lastPrompt = lastPrompt;
  SESSIONS.set(chatId, s);
}

/* ---- Utilidades específicas ---- */
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
  const rec = `⏰ Recibida: ${fmtDateLima(now, TZ)}, ${fmtTimeLima(now, TZ)}`;
  const code = `#RES${Math.floor(Math.random() * 1e9)
    .toString()
    .padStart(9, "0")}`;
  return [hdr, body, "", rec, "", code, "#Roxi #Lead"].join("\n");
}

/* ---- Helpers de extracción laxa (para mensajes largos) ---- */
async function tryLooseExtract(t: string, s: Session, todayISO: string) {
  // 1) Intent/entidades por LLM (resiliente)
  const ai = await classifyIntent({ userText: t });

  // 2) Espacio
  if (!s.data.space_name) {
    const fromAI = ai.entities.space_name ?? null;
    const canon =
      (fromAI && normalizeSpaceName(fromAI)) || normalizeSpaceName(t);
    if (canon) s.data.space_name = canon;
  }

  // 3) Fecha
  if (!s.data.date) {
    const fromText = parseDateFlexible(t, todayISO);
    const fromAI = ai.entities.date ?? null; // ya puede venir yyyy-mm-dd
    s.data.date = fromText || fromAI || undefined;
  }

  // 4) Hora
  if (!s.data.time) {
    const fromText = parseTimeFlexible(t);
    const fromAI = ai.entities.time ?? null; // podría venir “hh:mm”
    s.data.time = fromText || fromAI || undefined;
  }

  // 5) Teléfono (si lo mandaron junto)
  if (!s.data.phone && ai.entities.phone) {
    s.data.phone = ai.entities.phone;
  }
}

/* ---- API público ---- */
export function getCurrentStepFor(chatId: string): Step {
  return getSession(chatId).step;
}

/* ---- Motor principal ---- */
export type Action =
  | { kind: "reply"; text: string }
  | { kind: "send_admin"; text: string; alsoReply?: string }
  | { kind: "handoff_number"; text: string };

function bumpRetries(s: Session) {
  s.retries[s.step] = (s.retries[s.step] ?? 0) + 1;
}

export async function handleIncomingText(
  from: string,
  text: string,
): Promise<Action[]> {
  const s = getSession(from);
  const tRaw = text?.trim() ?? "";
  const t = tRaw.normalize("NFKC");
  const todayISO = todayLimaISO(TZ);

  /* Controles universales */
  if (isWebsiteQuery(t)) {
    const link = chatbotConfig.websiteUrl;
    return [
      {
        kind: "reply",
        text: `Nuestra web es ${link}\n\n${promptFor(s.step, todayISO, OPEN_START, OPEN_END)}`,
      },
    ];
  }
  if (isFarewell(t) && (s.step === "done" || s.step === "idle")) {
    SESSIONS.delete(from);
    return [
      {
        kind: "reply",
        text: "¡Listo! Gracias por escribir. Cuando gustes, envía “reservar” para iniciar otra solicitud.",
      },
    ];
  }
  if (isCancel(t)) {
    SESSIONS.delete(from);
    return [
      {
        kind: "reply",
        text: "Flujo reiniciado. Escribe “reservar” para empezar o pregúntame lo que necesites.",
      },
    ];
  }
  if (backRequested(t)) {
    const order: Step[] = [
      "idle",
      "phone",
      "space",
      "date",
      "time",
      "review",
      "done",
    ];
    const idx = order.indexOf(s.step);
    if (idx > 1) {
      s.step = order[idx - 1];
      save(from, s);
      return [
        {
          kind: "reply",
          text: `Volvemos un paso. ${promptFor(s.step, todayISO, OPEN_START, OPEN_END)}`,
        },
      ];
    }
  }
  if (isHelp(t)) {
    return [
      { kind: "reply", text: helpFor(s.step, todayISO, OPEN_START, OPEN_END) },
    ];
  }

  /* Idle: clasificador o palabra clave */
  if (s.step === "idle" && !isReserveKeyword(t)) {
    const intent = await classifyIntent({ userText: t });
    if (intent.intent === "reservation_start") {
      s.step = "phone";
      save(from, s);
      return [
        {
          kind: "reply",
          text:
            "Perfecto, iniciemos tu solicitud.\n" +
            promptFor("phone", todayISO, OPEN_START, OPEN_END),
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
        text: "Genial. " + promptFor("phone", todayISO, OPEN_START, OPEN_END),
      },
    ];
  }

  /* phone */
  if (s.step === "phone") {
    if (await wantsSkipAI(t)) {
      s.step = "space";
      save(from, s);
      return [
        {
          kind: "reply",
          text: softSkipResponse(
            promptFor("space", todayISO, OPEN_START, OPEN_END),
          ),
        },
      ];
    }
    const digits = t.replace(/\D+/g, "");
    if (!/^9\d{8}$/.test(digits)) {
      bumpRetries(s);
      save(from, s);
      const msg =
        s.retries.phone >= MAX_RETRIES
          ? helpFor("phone", todayISO, OPEN_START, OPEN_END)
          : "Formato no válido. Debe empezar en 9 y tener 9 dígitos.\n" +
            promptFor("phone", todayISO, OPEN_START, OPEN_END);
      return [{ kind: "reply", text: msg }];
    }
    s.data.phone = digits;
    s.step = "space";
    save(from, s);
    return [
      {
        kind: "reply",
        text:
          "Gracias ✅. " + promptFor("space", todayISO, OPEN_START, OPEN_END),
      },
    ];
  }

  /* space (acepta mensaje largo con fecha y hora) */
  if (s.step === "space") {
    if (await wantsSkipAI(t)) {
      s.step = "date";
      save(from, s);
      return [
        {
          kind: "reply",
          text: softSkipResponse(
            promptFor("date", todayISO, OPEN_START, OPEN_END),
          ),
        },
      ];
    }

    // Intento extraer todo lo posible del mensaje
    await tryLooseExtract(t, s, todayISO);

    // Sugerencia rápida si es “1 persona”
    if (/\b(una persona|1 persona|solo|individual)\b/i.test(t)) {
      const hint =
        chatbotConfig.spaceHints?.onePerson ??
        "Para 1 persona: Unidad (privado 1p). Como individual en compartido: Base Operativa o El Hangar.";
      // no retornamos aún; continuamos abajo con la lógica
      await Promise.resolve(hint);
    }

    // Normaliza espacio si aún no lo tenemos
    if (!s.data.space_name) {
      const canon = normalizeSpaceName(t);
      if (!canon) {
        bumpRetries(s);
        save(from, s);
        const msg =
          s.retries.space >= MAX_RETRIES
            ? helpFor("space", todayISO, OPEN_START, OPEN_END)
            : "No identifiqué el espacio.\n" +
              // pequeña tabla compacta
              "Opciones: Unidad (1p) · Bunker (2–4) · Brigada (2–4) · Base de Mando (2–10) · Base Operativa / El Hangar (individual)\n\n" +
              promptFor("space", todayISO, OPEN_START, OPEN_END);
        return [{ kind: "reply", text: msg }];
      }
      s.data.space_name = canon;
    }

    // Decidir siguiente paso según lo que ya capturamos
    if (!s.data.date) {
      s.step = "date";
      save(from, s);
      return [
        {
          kind: "reply",
          text:
            "Anotado 🏢. " + promptFor("date", todayISO, OPEN_START, OPEN_END),
        },
      ];
    }
    if (!s.data.time) {
      s.step = "time";
      save(from, s);
      return [
        {
          kind: "reply",
          text:
            "Anotado 🏢. " + promptFor("time", todayISO, OPEN_START, OPEN_END),
        },
      ];
    }

    // Si ya llegaron date + time en el mismo mensaje, validamos y saltamos a review
    if (!isDateNotPastLima(todayISO, s.data.date)) {
      s.step = "date";
      save(from, s);
      return [
        {
          kind: "reply",
          text: `Esa fecha ya pasó. Elige una a partir de ${todayISO}.\n${promptFor("date", todayISO, OPEN_START, OPEN_END)}`,
        },
      ];
    }
    if (!isValidTimeHHmm(s.data.time)) {
      const parsed = parseTimeFlexible(s.data.time);
      if (!parsed) {
        s.step = "time";
        save(from, s);
        return [
          {
            kind: "reply",
            text: helpFor("time", todayISO, OPEN_START, OPEN_END),
          },
        ];
      }
      s.data.time = parsed;
    }
    if (!isWithinOpenHours(s.data.time, OPEN_START, OPEN_END)) {
      s.step = "time";
      save(from, s);
      return [
        {
          kind: "reply",
          text: `Estamos disponibles entre ${OPEN_START} y ${OPEN_END}. Elige una hora dentro de ese rango.\n${promptFor("time", todayISO, OPEN_START, OPEN_END)}`,
        },
      ];
    }
    s.step = "review";
    save(from, s);
    return [
      {
        kind: "reply",
        text:
          "Perfecto ✅. " + promptFor("review", todayISO, OPEN_START, OPEN_END),
      },
    ];
  }

  /* date */
  if (s.step === "date") {
    if (await wantsSkipAI(t)) {
      s.step = "time";
      save(from, s);
      return [
        {
          kind: "reply",
          text:
            "Ok, coordinaremos la fecha luego. " +
            promptFor("time", todayISO, OPEN_START, OPEN_END),
        },
      ];
    }
    const value = parseDateFlexible(t, todayISO);
    if (!value) {
      bumpRetries(s);
      save(from, s);
      const msg =
        s.retries.date >= MAX_RETRIES
          ? helpFor("date", todayISO, OPEN_START, OPEN_END)
          : `Formato inválido.\n${promptFor("date", todayISO, OPEN_START, OPEN_END)}`;
      return [{ kind: "reply", text: msg }];
    }
    if (!isDateNotPastLima(todayISO, value)) {
      bumpRetries(s);
      save(from, s);
      const msg =
        s.retries.date >= MAX_RETRIES
          ? helpFor("date", todayISO, OPEN_START, OPEN_END)
          : `Esa fecha ya pasó. Elige una a partir de ${todayISO}.\n${promptFor("date", todayISO, OPEN_START, OPEN_END)}`;
      return [{ kind: "reply", text: msg }];
    }
    s.data.date = value;
    s.step = "time";
    save(from, s);
    return [
      {
        kind: "reply",
        text:
          "¡Perfecto! 📅 " + promptFor("time", todayISO, OPEN_START, OPEN_END),
      },
    ];
  }

  /* time (no envía lead aún; se enviará en review para evitar duplicado) */
  if (s.step === "time") {
    if (await wantsSkipAI(t)) {
      s.step = "review";
      save(from, s);
      return [
        {
          kind: "reply",
          text:
            "Sin problema, la hora la coordinamos luego. " +
            promptFor("review", todayISO, OPEN_START, OPEN_END),
        },
      ];
    }

    const parsed = parseTimeFlexible(t);
    if (!parsed) {
      bumpRetries(s);
      save(from, s);
      const msg =
        s.retries.time >= MAX_RETRIES
          ? helpFor("time", todayISO, OPEN_START, OPEN_END)
          : `No logré entender la hora.\n${promptFor("time", todayISO, OPEN_START, OPEN_END)}`;
      return [{ kind: "reply", text: msg }];
    }
    if (!isWithinOpenHours(parsed, OPEN_START, OPEN_END)) {
      bumpRetries(s);
      save(from, s);
      const msg =
        s.retries.time >= MAX_RETRIES
          ? helpFor("time", todayISO, OPEN_START, OPEN_END)
          : `Estamos disponibles entre ${OPEN_START} y ${OPEN_END}. Elige una hora dentro de ese rango.\n${promptFor("time", todayISO, OPEN_START, OPEN_END)}`;
      return [{ kind: "reply", text: msg }];
    }

    s.data.time = parsed;
    s.step = "review";
    save(from, s);
    return [
      {
        kind: "reply",
        text:
          "Listo ✅. " + promptFor("review", todayISO, OPEN_START, OPEN_END),
      },
    ];
  }

  /* review (enviamos el lead UNA sola vez) */
  if (s.step === "review") {
    if (await wantsSkipAI(t)) {
      const msgAdmin = prettyLead(s.data);
      s.step = "done";
      save(from, s);
      return [
        {
          kind: "send_admin",
          text: msgAdmin,
          alsoReply: "Solicitud enviada al equipo 👌.",
        },
        {
          kind: "handoff_number",
          text: `Si deseas atención inmediata, contáctanos al +${chatbotConfig.adminDirectNumber.replace(/@c\.us$/, "")}. ¿Necesitas algo más?`,
        },
      ];
    }

    // Heurísticas para opcionales
    const emailMatch = t.match(/[\w.+-]+@[\w.-]+\.\w+/);
    const dniMatch = t.match(/\b\d{8}\b/);
    const peopleMatch = t.match(/\b(\d+)\s*(personas?|pax?)?\b/i);

    if (emailMatch) s.data.email = emailMatch[0];
    if (dniMatch) s.data.dni = dniMatch[0];
    if (peopleMatch) {
      const n = Number(peopleMatch[1]);
      if (n > 0 && n < 1000) s.data.people = n;
    }

    // Nombre “suave”: texto sin @ ni dígitos, ≥2 palabras
    const clean = t.replace(/\s+/g, " ").trim();
    const looksLikeName =
      !emailMatch &&
      !dniMatch &&
      !/\d|@/.test(clean) &&
      clean.split(" ").length >= 2 &&
      clean.length <= 80;
    if (looksLikeName) {
      s.data.full_name = clean;
    } else if (!emailMatch && !dniMatch && !peopleMatch) {
      // Si no parece nombre, lo tomamos como motivo
      s.data.purpose = clean;
    }

    // Enviar lead enriquecido (UNA vez)
    const msgAdmin = prettyLead(s.data);
    s.step = "done";
    save(from, s);
    return [
      {
        kind: "send_admin",
        text: msgAdmin,
        alsoReply: "Gracias, ya envié tu solicitud al equipo 🙌.",
      },
      {
        kind: "handoff_number",
        text: `Si deseas atención inmediata, contáctanos al +${chatbotConfig.adminDirectNumber.replace(/@c\.us$/, "")}. ¿Puedo ayudarte con algo más?`,
      },
    ];
  }

  /* done */
  return [
    {
      kind: "reply",
      text: "¿Te ayudo con información o deseas iniciar una reserva? Escribe “reservar” para empezar o “cancel” para reiniciar.",
    },
  ];
}
