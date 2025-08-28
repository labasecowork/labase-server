// src/modules/chatbot/presentation/ui/greeting.ts
const GREET_COOLDOWN_MS = 1000 * 60 * 60 * 6;
const lastGreet = new Map<string, number>();

export const BOT_NAME = process.env.CHATBOT_NAME ?? "Roxi";

function norm(s: string) {
  return s.normalize("NFKC").trim().toLowerCase();
}

export function shouldGreet(from: string, text: string) {
  const now = Date.now();
  const last = lastGreet.get(from) ?? 0;
  if (now - last < GREET_COOLDOWN_MS) return false;

  const t = norm(text);
  const isGreeting =
    /^(hola|buenas|buenos dias|buenas tardes|buenas noches|hey|ola)\b/i.test(t);

  return isGreeting;
}

export function isPureGreeting(text: string) {
  const t = norm(text)
    .replace(/[!¡¿?.,;:()\[\]"'*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const greetings = new Set([
    "hola",
    "buenas",
    "buenos dias",
    "buenas tardes",
    "buenas noches",
    "hey",
    "ola",
  ]);
  return greetings.has(t);
}

export function makeIntro() {
  return `Hola, soy ${BOT_NAME}, asistente virtual de La Base Cowork.
Puedo darte informacion de la empresa, lo que hacemos, precios, horarios o ayudarte a reservar.`;
}

export function markGreeted(from: string) {
  lastGreet.set(from, Date.now());
}
