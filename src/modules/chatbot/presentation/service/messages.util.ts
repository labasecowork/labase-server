import type { Step } from "./lead_funnel.service";

export function promptFor(
  step: Step,
  todayISO: string,
  OPEN_START: string,
  OPEN_END: string,
): string {
  switch (step) {
    case "phone":
      return "¿Cuál es tu número de celular? (9 dígitos, empieza con 9). *Opcional:* escribe *siguiente* para continuar.";
    case "space":
      return "¿Qué espacio te interesa? (Unidad 1p, Bunker 2–4, Brigada 2–4, Base de Mando 2–10, Base Operativa / El Hangar). *Opcional:* *siguiente* si aún no decides.";
    case "date":
      return "¿Para qué fecha? (yyyy-mm-dd o “mañana”).";
    case "time":
      return `¿A qué hora? (acepto “9”, “9:00”, “9am”, “04:30 pm”, “mediodía”…). Atendemos ${OPEN_START}–${OPEN_END}.`;
    case "review":
      return "Datos opcionales: *nombre*, *email*, *motivo*, *personas*. Responde lo que tengas o escribe *siguiente* para finalizar.";
    default:
      return "¿Te ayudo con información o deseas iniciar una reserva? Escribe “reservar” para empezar o “cancel” para reiniciar.";
  }
}

export function softSkipResponse(nextLabel: string) {
  return `Entendido, no hay problema 😉. Sigamos: ${nextLabel}`;
}

export function helpFor(
  step: Step,
  todayISO: string,
  OPEN_START: string,
  OPEN_END: string,
): string {
  const extra =
    step === "phone"
      ? "Ejemplo válido: 9XXXXXXXX (9 dígitos)."
      : step === "space"
        ? "Ejemplos: “Unidad”, “Bunker”, “Base Operativa”."
        : step === "date"
          ? `Ejemplo: ${todayISO} (yyyy-mm-dd) o “mañana”.`
          : step === "time"
            ? `Ejemplos: 09:00 · 9am · 4:30 pm · “mediodía”. Rango: ${OPEN_START}–${OPEN_END}.`
            : "Puedes responder o escribir *siguiente* para continuar.";
  return `Parece que hubo un detalle con el dato. ${extra}\n\n${promptFor(step, todayISO, OPEN_START, OPEN_END)}`;
}
