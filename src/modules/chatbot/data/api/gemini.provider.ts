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
    "Siempre en español, cordial y concisa (máx. 3 líneas).",
    "No inicies la respuesta con saludos (‘hola’, etc.).",
    "Usa como máximo 1 emoji cuando ayude.",
    "No reinicies conversación, no repitas saludos.",
    "Si el tema no es pertinente, responde corto y reconduce al cowork.",
    "Para reservas, pide datos PASO A PASO. No confirmes ni apartes nada.",
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
    "- Máx. 3 líneas, directo al punto.",
    "- Si pregunta por precios/horarios/espacios → responde literal desde CONTEXTO.",
    "- Si está en reserva → pide SOLO el siguiente dato faltante.",
    "- Cierre: ofrece 1) derivar a admin, 2) web, o 3) número directo.",
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
  if (/^9\d{8}$/.test(d)) return d; // 9xxxxxxxx
  if (/^51?9\d{8}$/.test(d)) return d.slice(-9); // 51 9xxxxxxxx → 9xxxxxxxx
  return null;
}

function normDateISO(d?: string | null) {
  if (!d) return null;
  // Admite dd/mm/yyyy y yyyy-mm-dd
  const s = d.trim();
  const m1 = s.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
  if (m1) return `${m1[3]}-${m1[2]}-${m1[1]}`; // dd/mm/yyyy → yyyy-mm-dd
  const m2 = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m2) return s;
  return null;
}

function normTime(t?: string | null) {
  if (!t) return null;
  const s = t.trim();
  const m = s.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const hh = String(m[1]).padStart(2, "0");
  const mm = m[2];
  return `${hh}:${mm}`;
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
