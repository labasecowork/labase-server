import { classifyControl } from "../../data/api/gemini.provider";

export const SKIP_REGEX =
  /\b(omitir|omítelo|skip|no tengo|prefiero no|paso|me salto|pasemos|siguiente|next|continuar|luego|después|despues|más tarde|mas tarde|más adelante|mas adelante)\b/i;

export function isReserveKeyword(t: string) {
  return /\b(reservar|reserva|booking|apartado)\b/i.test(t);
}
export function isCancel(t: string) {
  return /\b(cancel|cancelar|reiniciar|reset)\b/i.test(t);
}
// ya no dispara ayuda por sí solo
export function isHelp(t: string) {
  return /\b(ayuda|help|no\s+entiendo|no\s+s[eé]\s+c[oó]mo|puedes\s+ayudar)\b/i.test(
    t,
  );
}
export function backRequested(t: string) {
  return /\b(atrás|atras|volver|back)\b/i.test(t);
}
// Despedidas para cerrar suave
export function isFarewell(t: string) {
  return /\b(es\s*todo|nada\s+m[áa]s|eso\s+ser[ií]a\s+tod[oa]|listo(?:\s+gracias)?|ok\s+gracias|ya\s+gracias|todo\s+ok|hasta\s+luego|ad[ií]os|chau|nos\s+vemos)\b/i.test(
    t,
  );
}
// Consulta de web en cualquier punto
export function isWebsiteQuery(t: string) {
  return /\b(web|p[áa]gina|sitio|website|p[áa]gina\s+web|pagina\s+web|site)\b/i.test(
    t,
  );
}

export async function wantsSkipAI(t: string): Promise<boolean> {
  const ai = await classifyControl({ userText: t });
  if (ai.skip && ai.confidence >= 0.6) return true;
  return SKIP_REGEX.test(t);
}
