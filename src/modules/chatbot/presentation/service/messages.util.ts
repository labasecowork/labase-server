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
      return [
        "¿Qué espacio te interesa? Elige uno y escríbelo (o *siguiente* si aún no decides):",
        "• Unidad (1 persona, privado)",
        "• Bunker (2–4, privado)",
        "• Brigada (2–4, equipo)",
        "• Base de Mando (2–10, reuniones)",
        "• Base Operativa (individual en compartido)",
        "• El Hangar (individual en compartido)",
      ].join("\n");
    case "date":
      return "¿Para qué fecha? (yyyy-mm-dd, yyyy/mm/dd o “mañana”).";
    case "time":
      return `¿A qué hora? Usa formato 12h o 24h. Atendemos ${OPEN_START}–${OPEN_END}.`;
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
        ? "Escribe el nombre exacto de la lista."
        : step === "date"
          ? `Ejemplos: ${todayISO} (yyyy-mm-dd) · ${todayISO.replace(/-/g, "/")} (yyyy/mm/dd) · “mañana”.`
          : step === "time"
            ? `Usa formato 12h o 24h. Rango: ${OPEN_START}–${OPEN_END}.`
            : "Puedes responder o escribir *siguiente* para continuar.";
  return `Parece que hubo un detalle con el dato. ${extra}\n\n${promptFor(step, todayISO, OPEN_START, OPEN_END)}`;
}
