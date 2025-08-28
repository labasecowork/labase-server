// src/modules/chatbot/data/api/gemini.provider.ts
import axios from "axios";
import { API_KEY_GEMINI } from "../../../../config/env";
import { chatbotConfig } from "../config/chatbot.config";

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";

const client = axios.create({
  baseURL: `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
  timeout: 12000,
});

// ================== TIPOS ==================
export type GenOpts = {
  userText: string;
  context?: string;
  historyHint?: string;
};

export type IntentResult = {
  intent:
    | "general_info"
    | "pricing"
    | "hours"
    | "spaces"
    | "reservation_start"
    | "other";
  entities: {
    full_name?: string | null;
    dni?: string | null;
    phone?: string | null;
    space_name?: string | null;
    date?: string | null;
    time?: string | null;
    people?: number | null;
    purpose?: string | null;
  };
  confidence: number;
};

export type ClassifyOpts = { userText: string; context?: string };

function systemPreamble() {
  return [
    "Eres Roxi, asistente oficial de La Base Cowork (Huancayo).",
    "Siempre en español, cordial y concisa (máx. 4 líneas).",
    "No inicies la respuesta con saludos (‘hola’, etc.).",
    "Usa como máximo 2 emoji cuando ayude.",
    "No reinicies conversación, no repitas saludos.",
    "Si el tema no es pertinente, responde corto y reconduce al cowork.",
    "Para reservas, pide datos PASO A PASO para ser derivado a un admin dicha información. No confirmes ni apartes nada.",
  ].join(" ");
}

function buildBusinessContext() {
  return chatbotConfig.context;
}

// ================== GENERATE REPLY ==================
export async function generateReply({
  userText,
  context,
  historyHint,
}: GenOpts): Promise<string> {
  const business = context ?? buildBusinessContext();

  const prompt = [
    systemPreamble(),
    "### CONTEXTO OFICIAL",
    business,
    "### HISTORIAL (1 línea, opcional)",
    (historyHint ?? "N/D").slice(0, 160),
    "### MENSAJE DEL USUARIO",
    userText,
    "### INSTRUCCIONES DE RESPUESTA",
    "- Máx. 4 líneas, directo al punto.",
    "- Si pregunta por precios/horarios/espacios → responde literal desde CONTEXTO.",
    "- Si está en reserva → pide SOLO el siguiente dato faltante.",
    "- Cierre: ofrece 1) derivar a admin, 2) web, o 3) número directo.",
    "- Si el usuario menciona cantidad de personas, sugiere usando *spaceHints* (sin inventar).",
    "- Usa *spaceAliases* para entender sinónimos de los espacios.",
    "### RESPUESTA (solo texto, sin listas):",
  ].join("\n\n");

  try {
    const { data } = await client.post(`?key=${API_KEY_GEMINI}`, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        topP: 0.9,
        maxOutputTokens: 150,
      },
    });

    let out =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "¿Podrías precisar un poco más tu consulta?";

    // Guardas simples anti-derrape
    out = out.replace(/\n{3,}/g, "\n\n");

    // Forzar máx. 3 líneas
    const lines = out.split(/\r?\n/).filter(Boolean);
    if (lines.length > 3) out = lines.slice(0, 3).join("\n");

    // Longitud máxima de seguridad
    if (out.length > 550) out = out.slice(0, 550) + "…";

    return out;
  } catch {
    return "Tuvimos un problema procesando tu mensaje. Inténtalo nuevamente.";
  }
}

// ================== INTENT CLASSIFIER (JSON robusto) ==================
function extractJson(text: string): any {
  if (!text) return null;
  // Intenta aislar el primer objeto JSON
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  const candidate = text.slice(start, end + 1);
  try {
    return JSON.parse(candidate);
  } catch {
    return null;
  }
}

function normPhonePe(p?: string | null) {
  if (!p) return null;
  const d = String(p).replace(/\D+/g, "");
  if (/^9\d{8}$/.test(d)) return d;
  if (/^51?9\d{8}$/.test(d)) return d.slice(-9); // 51 9xxxxxxxx → 9xxxxxxxx
  return null;
}

function normDateISO(d?: string | null) {
  if (!d) return null;
  const s = d.trim();
  const m1 = s.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
  if (m1) return `${m1[3]}-${m1[2]}-${m1[1]}`; // dd/mm/yyyy → yyyy-mm-dd
  const m2 = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m2) return s;
  return null;
}

function normTime(t?: string | null) {
  if (!t) return null;
  let s = t.trim().toLowerCase();
  s = s.replace(/\s+/g, " ");
  const r = s.match(
    /(.+?)(?:\s*[-–a]\s*)(\d{1,2}(:\d{2})?\s*(a\.?m?\.?|p\.?m?\.?)?|\bmediod[ií]a\b|\bmedianoche\b)/i,
  );
  if (r) s = r[1];

  if (/\bmediod[ií]a\b/.test(s)) return "12:00";
  if (/\bmedianoche\b/.test(s)) return "00:00";

  const m = s.match(/\b(\d{1,2})(?::(\d{2}))?\s*(a\.?m?\.?|p\.?m?\.?)?\b/i);
  if (!m) return null;

  let hh = parseInt(m[1]!, 10);
  const mm = m[2] ? parseInt(m[2], 10) : 0;
  const ap = (m[3] || "").toLowerCase();
  if (ap.startsWith("a")) {
    if (hh === 12) hh = 0;
  } else if (ap.startsWith("p")) {
    if (hh < 12) hh += 12;
  }
  if (hh < 0 || hh > 23 || mm < 0 || mm > 59) return null;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export async function classifyIntent({
  userText,
  context,
}: ClassifyOpts): Promise<IntentResult> {
  const business = context ?? buildBusinessContext();

  const jsonSchema = `Devuelve SOLO JSON válido:
{
  "intent": "general_info|pricing|hours|spaces|reservation_start|other",
  "entities": {
    "full_name": "string|null",
    "dni": "string|null",
    "phone": "string|null",
    "space_name": "string|null",
    "date": "string|null",
    "time": "string|null",
    "people": number|null,
    "purpose": "string|null"
  },
  "confidence": number
}`;

  const prompt = [
    systemPreamble(),
    "### CONTEXTO OFICIAL",
    business,
    "### MENSAJE",
    userText,
    "### TAREA",
    "1) Clasifica intención.",
    "2) Extrae entidades (usa null si falta).",
    "3) Responde SOLO con JSON válido.",
    jsonSchema,
  ].join("\n\n");

  try {
    const { data } = await client.post(`?key=${API_KEY_GEMINI}`, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
        maxOutputTokens: 120,
      },
    });

    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
    const parsed = extractJson(raw) ?? {};
    const ents = parsed?.entities ?? {};

    return {
      intent: parsed?.intent ?? "other",
      entities: {
        full_name: ents.full_name ?? null,
        dni: ents.dni ?? null,
        phone: normPhonePe(ents.phone),
        space_name: (ents.space_name ?? null)?.trim() || null,
        date: normDateISO(ents.date),
        time: normTime(ents.time),
        people: typeof ents.people === "number" ? ents.people : null,
        purpose: ents.purpose ?? null,
      },
      confidence:
        typeof parsed?.confidence === "number" ? parsed.confidence : 0.5,
    };
  } catch {
    // Devuelve shape completo y tipado
    return {
      intent: "other",
      entities: {
        full_name: null,
        dni: null,
        phone: null,
        space_name: null,
        date: null,
        time: null,
        people: null,
        purpose: null,
      },
      confidence: 0.0,
    };
  }
}

export type ControlResult = {
  skip: boolean;
  cancel: boolean;
  help: boolean;
  back: boolean;
  confidence: number;
};

function extractJsonStrict(text: string): any {
  if (!text) return null;
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

export async function classifyControl({
  userText,
}: {
  userText: string;
}): Promise<ControlResult> {
  const prompt = [
    "Eres un clasificador de controles para un bot de reservas en español.",
    "Debes responder SOLO con JSON válido del siguiente esquema:",
    `{
  "skip": boolean,
  "cancel": boolean,
  "help": boolean,
  "back": boolean,
  "confidence": number
}`,
    "skip = cuando el usuario quiere omitir el dato (‘omitir’, ‘no tengo’, ‘prefiero no decir’, ‘luego’, etc.).",
    "cancel = cancelar o reiniciar.",
    "help = pide ayuda o explicación.",
    "back = volver atrás.",
    "confidence = 0 a 1, qué tan seguro estás.",
    "Texto:",
    userText,
  ].join("\n\n");

  try {
    const { data } = await client.post(`?key=${API_KEY_GEMINI}`, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
        maxOutputTokens: 100,
      },
    });

    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
    const parsed = extractJsonStrict(raw) ?? {};

    return {
      skip: !!parsed.skip,
      cancel: !!parsed.cancel,
      help: !!parsed.help,
      back: !!parsed.back,
      confidence:
        typeof parsed.confidence === "number" ? parsed.confidence : 0.0,
    };
  } catch {
    return {
      skip: false,
      cancel: false,
      help: false,
      back: false,
      confidence: 0,
    };
  }
}
